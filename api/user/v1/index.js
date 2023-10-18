const router = require("express").Router();

const getAllUsers = async (req, res) => {
  res.status(200).json({ success: true, message: "Get all users" })
}

const createNewUser = async (req, res) => {
  res.status(200).json({ success: true, message: "Create new user" })
}

const getUserById = async (req, res) => {
  res.status(200).json({ success: true, message: "Get user by id" })
}

const updateUserById = async (req, res) => {
  res.status(200).json({ success: true, message: "Update user by id" })
}

const deleteUserById = async (req, res) => {
  res.status(200).json({ success: true, message: "Delete user by id" })
}

router.get("/user", getAllUsers)
router.post("/user", createNewUser)
router.get("/user/:userId", getUserById)
router.put("/user/:userId", updateUserById)
router.delete("/user/:userId", deleteUserById)

module.exports = router;
