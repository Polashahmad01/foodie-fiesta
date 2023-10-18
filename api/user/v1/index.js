const router = require("express").Router();
const { ObjectId } = require("mongodb")

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
  const { client, db } = await getMongoConnection()
  try {
    const { userId } = req.params
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId)}, { sort: { "users.name": -1 }})
    console.log("user", user)
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const updateUserById = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { userId } = req.params
    const { name, email } = req.body
    const user = await db.collection("users").updateOne({ _id: new ObjectId(userId)}, { $set: { name, email }})
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
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
