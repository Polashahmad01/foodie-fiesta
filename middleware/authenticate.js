const admin = require("firebase-admin")
require("dotenv").config({ path: "../.env"})

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const authenticate = async (req, res, next) => {
  if(req.headers?.authorization) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      const decodedUser = await admin.auth().verifyIdToken(token)
      const email = decodedUser.email
      const userId = decodedUser.uid
      if(!email) {
        throw new Error("Email not found in decoded token")
      }
      if(!userId) {
        throw new Error("User ID not found in decoded token")
      }
      req.headers.user = {
        email,
        userId
      }
      next()
    } catch (error) {
      res.status(401).json({ success: false, message: "Not Authorized", error: error.message })
    }
  } else {
    res.status(401).json({ success: false, error: "Not Authorized", message: "No auth header found" })
  }
}

module.exports = authenticate
