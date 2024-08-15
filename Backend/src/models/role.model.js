import mongoose from 'mongoose'
import { RoleList } from '../../config.js'

const rolesSchema =new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: RoleList
  }
})

export default mongoose.model('Role', rolesSchema)