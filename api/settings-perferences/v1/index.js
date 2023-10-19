const router = require("express").Router()
const { ObjectId } = require("mongodb")

const getMongoConnection = require("../../../config/mongo-connect")

const getSettings = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { userId } = req.params
    const settings = await db.collection("settings").findOne({ userId: new ObjectId(userId) })
    res.status(200).json({ success: true, data: settings })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const updateSettings = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { userId } = req.params
    const result = await db.collection("settings").updateOne(
      { userId: new ObjectId(userId) },
      { $set: { ...req.body } },
      { upsert: true }
    )
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

router.get("/settings/:userId", getSettings)
router.put("/settings/:userId", updateSettings)

module.exports = router