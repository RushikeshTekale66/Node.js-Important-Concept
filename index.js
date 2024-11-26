"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var multer = require("multer");
var mongoose_1 = require("mongoose");
var adm_zip_1 = require("adm-zip");
var fs_1 = require("fs");
var path_1 = require("path");
var xml2js_1 = require("xml2js");
var uuid_1 = require("uuid");
// Initialize express app
var app = express();
app.use(express.json());
// Ensure directories exist
var tempDir = path_1.default.join(__dirname, 'uploads/temp');
var coursesDir = path_1.default.join(__dirname, 'uploads/courses');
if (!fs_1.default.existsSync(tempDir)) {
    fs_1.default.mkdirSync(tempDir, { recursive: true });
}
if (!fs_1.default.existsSync(coursesDir)) {
    fs_1.default.mkdirSync(coursesDir, { recursive: true });
}
// Mongoose model for Course collection
var CourseSchema = new mongoose_1.Schema({
    courseId: { type: String, required: true },
    moduleId: { type: String, required: true },
    courseName: { type: String, required: true },
    startImage: { type: String, required: true },
    scorm: { type: Boolean, required: true },
    path: { type: String, required: true },
    metadataTitle: { type: String, required: false },
    resourceHref: { type: String, required: false },
});
var Course = mongoose_1.default.model('Course', CourseSchema);
// Set up multer storage for file uploads
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempDir); // Ensure temp directory is used for uploads
    },
    filename: function (req, file, cb) {
        cb(null, "".concat((0, uuid_1.v4)(), "_").concat(file.originalname)); // Generate unique filenames
    },
});
var upload = multer({ storage: storage });
// Helper function to generate 4-digit ID
var generateId = function () { return String(Math.floor(1000 + Math.random() * 9000)); };
app.post('/api/scorm-upload', upload.fields([{ name: 'zipFile' }, { name: 'startImage' }]), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courseName, startImage, zipFilePath, courseId, moduleId, courseDir, zip, manifestPath, metadataTitle, resourceHref, manifestData, parser, parsedXml, langstring, course_1, error_1;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
    return __generator(this, function (_x) {
        switch (_x.label) {
            case 0:
                _x.trys.push([0, 4, , 5]);
                courseName = req.body.courseName;
                startImage = (_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.startImage) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.path;
                zipFilePath = (_f = (_e = (_d = req.files) === null || _d === void 0 ? void 0 : _d.zipFile) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.path;
                if (!courseName || !startImage || !zipFilePath) {
                    return [2 /*return*/, res.status(400).json({ message: 'Course name, start image, and zip file are required' })];
                }
                console.log('Received files:');
                console.log('Course Name:', courseName);
                console.log('Zip File Path:', zipFilePath);
                console.log('Start Image Path:', startImage);
                courseId = '0' + generateId();
                moduleId = '0' + generateId();
                courseDir = path_1.default.join(coursesDir, courseId);
                if (!fs_1.default.existsSync(courseDir)) {
                    fs_1.default.mkdirSync(courseDir, { recursive: true });
                }
                zip = new adm_zip_1.default(zipFilePath);
                zip.extractAllTo(courseDir, true); // Extract to course directory
                fs_1.default.unlinkSync(zipFilePath); // Delete original zip file after extraction
                console.log("Extracted contents to: ".concat(courseDir));
                manifestPath = path_1.default.join(courseDir, 'imsmanifest.xml');
                metadataTitle = '';
                resourceHref = '';
                if (!fs_1.default.existsSync(manifestPath)) return [3 /*break*/, 2];
                manifestData = fs_1.default.readFileSync(manifestPath, 'utf-8');
                parser = new xml2js_1.default.Parser();
                return [4 /*yield*/, parser.parseStringPromise(manifestData)];
            case 1:
                parsedXml = _x.sent();
                langstring = (_r = (_q = (_p = (_o = (_m = (_l = (_k = (_j = (_h = (_g = parsedXml === null || parsedXml === void 0 ? void 0 : parsedXml.manifest) === null || _g === void 0 ? void 0 : _g.metadata) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.lom) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.general) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.title) === null || _p === void 0 ? void 0 : _p[0]) === null || _q === void 0 ? void 0 : _q.langstring) === null || _r === void 0 ? void 0 : _r[0];
                metadataTitle = typeof langstring === 'object' && langstring._ ? langstring._ : ''; // Extract text if it's in nested object format
                resourceHref = ((_w = (_v = (_u = (_t = (_s = parsedXml === null || parsedXml === void 0 ? void 0 : parsedXml.manifest) === null || _s === void 0 ? void 0 : _s.resources) === null || _t === void 0 ? void 0 : _t[0]) === null || _u === void 0 ? void 0 : _u.resource) === null || _v === void 0 ? void 0 : _v[0]) === null || _w === void 0 ? void 0 : _w.$.href) || '';
                _x.label = 2;
            case 2:
                course_1 = new Course({
                    courseId: courseId,
                    moduleId: moduleId,
                    courseName: courseName,
                    startImage: startImage,
                    scorm: true,
                    path: "".concat(courseDir, "/"), // Save path as URL
                    metadataTitle: metadataTitle,
                    resourceHref: resourceHref,
                });
                return [4 /*yield*/, course_1.save()
                        .then(function () {
                        res.status(201).json({ message: 'SCORM course uploaded and processed successfully', course: course_1 });
                    })
                        .catch(function (error) {
                        console.error('Failed to save course:', error);
                        res.status(500).json({ message: 'Failed to save course', error: error });
                    })];
            case 3:
                _x.sent();
                return [3 /*break*/, 5];
            case 4:
                error_1 = _x.sent();
                console.error('Error in SCORM upload:', error_1);
                res.status(500).json({ message: 'Failed to upload and process SCORM course', error: error_1 });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Connect to MongoDB and start the server
mongoose_1.default.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    app.listen(3000, function () { return console.log('Server running on port 3000'); });
})
    .catch(function (err) { return console.error('Failed to connect to MongoDB:', err); });
