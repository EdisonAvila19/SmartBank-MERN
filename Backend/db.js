import 'dotenv/config'
import mongoose from 'mongoose'
import setupCollections from './src/libs/setupCollections.js'

export function getDB() {
  return mongoose.connection
}
mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    await setupCollections()
    return console.log('Connected to MongoDB')
  })
  .catch(err => console.log(err))