import express from 'express'
import morgan from 'morgan'
import authRoutes from './src/routes/auth.routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

const allowedOrigins = [
  'http://localhost:3000'
]

const options = {
  origin: allowedOrigins,
  credentials: true
}

app.use(cors(options))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)

export default app
