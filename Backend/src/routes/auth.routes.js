import { Router } from 'express'
import { login, register, logout, verifyToken, profile } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = Router()
router
  .post('/login', validateSchema(loginSchema), login)
  .post('/register', validateSchema(registerSchema), register)
  .post('/logout', logout)
  .get('/verify', authRequired, verifyToken)
  .get('/profile', authRequired, profile)

export default router
