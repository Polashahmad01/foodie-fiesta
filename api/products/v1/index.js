const router = require('express').Router();
const { ObjectId } = require("mongodb")

const getMongoConnection = require("../../../config/mongo-connect")

const getAllProducts = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const products = await db.collection("products").find({}).toArray()
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const getProductById = async (req, res) => {
  res.status(200).json({ success: true, message: "Get product by id" })
}

const createNewProduct = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const product = await db.collection("products").insertOne({ ...req.body })
    res.status(201).json({ success: true, data: product })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
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