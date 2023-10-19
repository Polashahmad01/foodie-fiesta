const router = require("express").Router()
const { ObjectId } = require("mongodb")

const getMongoConnection = require("../../../config/mongo-connect")

const getAllOrders = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const result = await db.collection("orders").find({}).toArray()
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const createNewOrder = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, userId } = req.body
    const order = {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: new ObjectId(userId)
    }
    const result = await db.collection("orders").insertOne(order)
    res.status(201).json({ success: true, message: "Order created", data: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const getOrderById = async (req, res) => {
  const { client, db } = await getMongoConnection()
  try {
    const { orderId } = req.params
    const result = await db.collection("orders").findOne({ _id: new ObjectId(orderId) })
    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  } finally {
    await client.close()
  }
}

const updateOrderById = async (req, res) => {
  res.status(200).json({ success: true, message: "Update order by id" })
}

const deleteOrderById = async (req, res) => {
  res.status(200).json({ success: true, message: "Delete order by id" })
}

router.get("/orders", getAllOrders)
router.post("/orders", createNewOrder)
router.get("/orders/:orderId", getOrderById)
router.put("/orders/:orderId", updateOrderById)
router.delete("/orders/:orderId", deleteOrderById)

module.exports = router
