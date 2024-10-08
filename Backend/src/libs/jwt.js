import jwt from 'jsonwebtoken'
import 'dotenv/config'

export function generateToken (user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, process.env.JWT_SECRET, {expiresIn: '1h'}, 
      (err, token) => {
        if (err) reject(err)
        resolve(token)
    })
  })
}