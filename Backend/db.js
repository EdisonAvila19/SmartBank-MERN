import mongoose from 'mongoose'
import 'dotenv/config'

export function getDB() {
  return mongoose.connection
}
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err))