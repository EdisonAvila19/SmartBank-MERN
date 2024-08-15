import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  balance: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accounttype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccountType',
    required: true,
  }
}, {
  timestamps: true
})

export default mongoose.model('Account', accountSchema)