import mongoose from 'mongoose'
import { AccountTypeList } from '../../config.js'

const accountTypeSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: AccountTypeList
  }
})

export default mongoose.model('AccountType', accountTypeSchema)