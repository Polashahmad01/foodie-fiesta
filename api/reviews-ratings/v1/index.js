const router = require("express").Router()
const { ObjectId } = require("mongodb")

const getMongoConnection = require("../../../config/mongo-connect")

const getAllReviewsAndRatings = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { productId } = req.params
    const reviews = await db.collection("reviews").find({ productId: new ObjectId(productId) }).toArray()
    res.status(200).json({ success: true, data: reviews })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const createReviewsAndRatings = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { productId } = req.params
    const review = await db.collection("reviews").insertOne({
      ...req.body,
      productId: new ObjectId(productId),
    })
    res.status(201).json({ success: true, data: review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const updateReviewsAndRatings = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { productId, reviewId } = req.params
    const review = await db.collection("reviews").findOneAndUpdate(
      { _id: new ObjectId(reviewId), productId: new ObjectId(productId) },
      { $set: req.body },
      { returnOriginal: false }
    )
    res.status(200).json({ success: true, data: review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const deleteReviewsAndRatings = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { productId, reviewId } = req.params
    const review = await db.collection("reviews").findOneAndDelete(
      { _id: new ObjectId(reviewId), productId: new ObjectId(productId) }
    )
    res.status(200).json({ success: true, data: review })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

router.get("/products/:productId/reviews", getAllReviewsAndRatings)
router.post("/products/:productId/reviews", createReviewsAndRatings)
router.put("/products/:productId/reviews/:reviewId", updateReviewsAndRatings)
router.delete("/products/:productId/reviews/:reviewId", deleteReviewsAndRatings)

module.exports = router