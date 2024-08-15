import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './src/routes/auth.routes.js'
import accountRoutes from './src/routes/account.routes.js'
import transactionRoutes from './src/routes/transaction.routes.js'

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
app.use('/api/accounts', accountRoutes)
app.use('/api/transactions', transactionRoutes)



export default app
