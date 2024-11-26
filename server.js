const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const { v4: uuidv4 } = require('uuid');

// Initialize express app
const app = express();
app.use(express.json());

// Ensure directories exist
const tempDir = path.join(__dirname, 'uploads/temp');
const coursesDir = path.join(__dirname, 'uploads/courses');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}
if (!fs.existsSync(coursesDir)) {
  fs.mkdirSync(coursesDir, { recursive: true });
}

// Mongoose model for Course collection
const CourseSchema = new mongoose.Schema({
  courseId: String,
  moduleId: String,
  courseName: String,
  startImage: String,
  scorm: Boolean,
  path: String,
  metadataTitle: String,
  resourceHref: String,
});
const Course = mongoose.model('Course', CourseSchema);

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); // Ensure temp directory is used for uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}_${file.originalname}`); // Generate unique filenames
  },
});
const upload = multer({ storage: storage });

// Helper function to generate 4-digit ID
const generateId = () => String(Math.floor(1000 + Math.random() * 9000));

app.post('/api/scorm-upload', upload.fields([{ name: 'zipFile' }, { name: 'startImage' }]), async (req, res) => {
  try {
    const courseName = req.body.courseName;
    const startImage = req.files.startImage[0].path; // Get the path of the start image
    const zipFilePath = req.files.zipFile[0].path; // Path of uploaded zip file

    console.log('Received files:');
    console.log('Course Name:', courseName);
    console.log('Zip File Path:', zipFilePath);
    console.log('Start Image Path:', startImage);

    // Generate unique courseId and moduleId
    const courseId = '0' + generateId();
    const moduleId = '0' + generateId();

    // Define directory path for storing extracted content
    const courseDir = path.join(coursesDir, courseId);
    if (!fs.existsSync(courseDir)) {
      fs.mkdirSync(courseDir, { recursive: true });
    }

    // Unzip and save content
    const zip = new AdmZip(zipFilePath);
    zip.extractAllTo(courseDir, true); // Extract to course directory
    fs.unlinkSync(zipFilePath); // Delete original zip file after extraction

    console.log(`Extracted contents to: ${courseDir}`);

    // Parse imsmanifest.xml for metadata
    const manifestPath = path.join(courseDir, 'imsmanifest.xml');
    let metadataTitle = '';
    let resourceHref = '';

    if (fs.existsSync(manifestPath)) {
      const manifestData = fs.readFileSync(manifestPath, 'utf-8');
      const parser = new xml2js.Parser();
      const parsedXml = await parser.parseStringPromise(manifestData);

      // Safely extract metadataTitle and resourceHref
      const langstring = parsedXml?.manifest?.metadata?.[0]?.lom?.[0]?.general?.[0]?.title?.[0]?.langstring?.[0];
      metadataTitle = typeof langstring === 'object' && langstring._ ? langstring._ : ''; // Extract text if it's in nested object format

      resourceHref = parsedXml?.manifest?.resources?.[0]?.resource?.[0]?.$.href || '';
    }


    // Save course data to the database
    const course = new Course({
      courseId,
      moduleId,
      courseName,
      startImage,
      scorm: true,
      path: `${courseDir}/`, // Save path as URL
      metadataTitle,
      resourceHref,
    });
    await course.save().then(() => {
      res.status(201).json({ message: 'SCORM course uploaded and processed successfully', course });
    })
      .catch((error) => {
        console.error('Failed to save course:', error);
        res.status(500).json({ message: 'Failed to save course', error });
      });

    // res.status(201).json({ message: 'SCORM course uploaded and processed successfully', course });
  } catch (error) {
    console.error('Error in SCORM upload:', error);
    res.status(500).json({ message: 'Failed to upload and process SCORM course', error });
  }
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err));
