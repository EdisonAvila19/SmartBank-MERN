import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: function(value) {
        const today = new Date()
        const birthdate = new Date(value)
        let age = today.getFullYear() - birthdate.getFullYear()
        const monthDifference = today.getMonth() - birthdate.getMonth()
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
          age--
        }
        return age >= 18
      },
      message: 'El usuario debe ser mayor de 18 años para poder registrarse'
    }

  }
}, {
  timestamps: true
})

export default mongoose.model('User', userSchema)