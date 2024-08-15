import mongoose from 'mongoose'

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
})

export default mongoose.model('Bank', bankSchema)