const User = require("../models/user");

// Get all data from user as a json
async function handleGetAllUser(req, res) {
    const allDbUser = await User.find({});
    res.json(allDbUser);
}

// Get data as per id which is provided ()
async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
}

// Update data
async function handleUpdateUserById(req, res) {
    // Update user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" })
    return res.json({ status: "success" });
}

// Delete user with id
async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success" });
}

// Create new user
async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender) {
        return res.status(400).json({ msg: "All fields are require ..." })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
    })
    console.log(result);
    return res.status(201).json({ msg: "Success" , id:result._id})
}

module.exports = {
    handleGetAllUser,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
}