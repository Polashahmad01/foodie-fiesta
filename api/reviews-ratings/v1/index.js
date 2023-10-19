const router = require("express").Router()
const { ObjectId } = require("mongodb")

const getMongoConnection = require("../../../config/mongo-connect")

const getAllReviewsAndRatings = async (req, res) => {
  res.status(200).json({ success: true, message: "Get all reviews for a product" })
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
  res.status(200).json({ success: true, message: "Update a review for a product" })
}

const deleteReviewsAndRatings = async (req, res) => {
  res.status(200).json({ success: true, message: "Delete a review for a product" })
}

router.get("/products/:productId/reviews", getAllReviewsAndRatings)
router.post("/products/:productId/reviews", createReviewsAndRatings)
router.put("/products/:productId/reviews/:reviewId", updateReviewsAndRatings)
router.delete("/products/:productId/reviews/:reviewId", deleteReviewsAndRatings)

module.exports = router