const router = require('express').Router();
const { ObjectId } = require("mongodb")

const getMongoConnection = require("../../../config/mongo-connect")

const getAllProducts = async (req, res) => {
  res.status(200).json({ success: true, message: "Get all products" })
}

const getProductById = async (req, res) => {
  res.status(200).json({ success: true, message: "Get product by id" })
}

const createNewProduct = async (req, res) => {
  res.status(201).json({ success: true, message: "Create new product" })
}

const updateProductById = async (req, res) => {
  res.status(200).json({ success: true, message: "Update product by id" })
}

const deleteProductById = async (req, res) => {
  res.status(200).json({ success: true, message: "Delete product by id" })
}

router.get("/products", getAllProducts)
router.get("products/:productId", getProductById)
router.post("/products", createNewProduct)
router.put("/products/:productId", updateProductById)
router.delete("/products/:productId", deleteProductById)

module.exports = router;