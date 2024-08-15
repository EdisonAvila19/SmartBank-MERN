import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  sourceAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  destinationAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  sourceAccountBalance: {
    type: Number,
    required: true
  },
  destinationAccountBalance: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Transaction', transactionSchema)