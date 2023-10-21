const router = require("express").Router()

const getMongoConnection = require("../../../config/mongo-connect")

const getAllProductsFromCart = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const result = await db.collection("cart").find({}).toArray()
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const addProductToCart = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    console.log("req.userData", await req.headers)
    res.status(200).json({ success: true, user: "Product added to cart" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const removeProductFromCart = async (req, res) => {
  res.status(200).json({ success: true, message: "Product removed from cart" })
}

router.get("/cart", getAllProductsFromCart)
router.post("/cart/add", addProductToCart)
router.post("/cart/remove", removeProductFromCart)

module.exports = router
