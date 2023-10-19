const admin = require("firebase-admin")
require("dotenv").config({ path: "../.env"})

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = await admin.auth().verifyIdToken(token)
    req.userData = decodedToken
    next()
  } catch (error) {
    res.status(401).json({ success: false, message: "Auth failed", error: error.message })
  }
}

module.exports = authenticate
