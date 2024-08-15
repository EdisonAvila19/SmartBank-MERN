import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function authRequired(req, res, next) {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' })
    req.user = decoded
    next()
  })
}