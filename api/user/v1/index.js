const router = require("express").Router();

const getMongoConnection = require("../../../config/mongo-connect")

const getAllUsers = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const users = await db.collection("users").find({}).toArray()    
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const createNewUser = async (req, res) => {
  const { client, db } = await  getMongoConnection()
  try {
    const { name, email, password } = req.body
    const user = await db.collection("users").insertOne({
      name,
      email
    })
    res.status(201).json({ success: true, data: user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
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
