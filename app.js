const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const colors = require("colors")
const cors = require("cors")

const userRoutes = require("./api/users")
const productRoutes = require("./api/products")
const orderRoutes = require("./api/orders")
const ratingRoutes = require("./api/reviews-ratings")
const settingRoutes = require("./api/settings-perferences")
const searchFilteringRoutes = require("./api/search-filtering")
const shippingRoutes = require("./api/shipping-cart")

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.use(cors())

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Welcome to Foodie Fiesta API" })
})

app.use("/api", userRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", ratingRoutes)
app.use("/api", settingRoutes)
app.use("/api", searchFilteringRoutes)
app.use("/api", shippingRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // Close app & exit process
  app.close(() => process.exit(1))
})
