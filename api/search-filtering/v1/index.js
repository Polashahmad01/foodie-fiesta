const router = require("express").Router()
const getMongoConnection = require("../../../config/mongo-connect")

const searchProductsByQuery = async (req, res) => {
  res.status(200).json({ success: true, message: "Search by product" })
}

const filterProductsByQuery = async (req, res) => {
  res.status(200).json({ success: true, message: "Filter by product" })
}

router.get("/product/search", searchProductsByQuery)
router.get("/product/filter", filterProductsByQuery)

module.exports = router
