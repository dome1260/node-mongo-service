const jwt = require('jsonwebtoken')
require('dotenv').config()

const secretKey = process.env.JWT_SECRET_KEY || 'ddome1260@#$='

const checkToken = (req, res, next) => {

  const token = req.headers?.authorization?.split(' ')[1] || null // ['barer', 'token']
  // const token = auth[1] ? auth[1] : null

  console.log('token => ', token)

  const decoded = jwt.decode(token, secretKey)

  console.log('decoded => ', decoded)

  if (token && decoded.exp <= Date.now() / 1000) {
    return res.status(401).json({
      code: 401,
      message: 'token expired'
    })
  }

  if (!token) {
    return res.status(403).json({
      code: 403,
      message: 'token unauthorized'
    })
  }

  next()
}

const createToken = (payload) => {
  console.log('secretKey => ', secretKey)
  return jwt.sign(payload, secretKey, { expiresIn: '7d' })
}

module.exports = {
  createToken,
  checkToken
}
