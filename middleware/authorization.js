const getMongoConnection = require("../config/mongo-connect")

const authorization = async (req, res, next) => {
  if(req.headers.user) {
    const { client, db } = await getMongoConnection()
    try {
      const { userId } = req.headers.user
      const user = await db.collection("users").findOne({ userId: userId })
      if(user.role === "superadmin") {
        next()
      } else {
        res.status(500).json({ succss: false, message: "User is not an Super Admin" })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({ succss: false, message: "Authorization user not found.", error: error.message })
    } finally {
      await client.close()
    }
  }
}

module.exports = authorization
