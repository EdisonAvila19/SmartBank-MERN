import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'
import Role from '../models/role.model.js'

import { generateToken } from '../libs/jwt.js'

export const login = async (req, res) => {
  console.log('login')
  try {
    const { username, password } = req.body

    if (!username || !password) throw new Error('Missing username or password')
    const user = await User.findOne({ username })

    if (!user) throw new Error('User not found')
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error('Invalid password')
    const token = await generateToken({id: user._id})

    const role = await Role.findById(user.role)
    res.cookie('token', token)
    res.json({ 
      id: user._id,
      username: user.username,
      email: user.email,
      role: role.type
     })

  } catch (error) {
    res.status(400).json({ error: [error.message] })
  }
}

export const register = async (req, res) => {
  try {
    console.log('register')
    const { username, email, password, birthdate, role = 'USER' } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const roleId = await Role.findOne({type: role})
    const newUser = new User({
      username: username,
      email: email,
      password: passwordHash,
      birthdate: birthdate,
      role: roleId._id
    })

    const savedUser = await newUser.save()
    const token = await generateToken({id: savedUser._id})

    const roleInfo = await Role.findById(savedUser.role)

    res.cookie('token', token)
    res.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      role: roleInfo.type
    })
    
  } catch (error) {
    res.status(500).json({ error: [error.message] })
  }
}

export const logout = (req, res) => {
  console.log('logout')
  res.cookie('token', '', {expires: new Date(0)})
  res.json({ message: 'Logged out' }) 
}

export const verifyToken = async (req, res) => {
  console.log('verifyToken')
  try {
    const userFound = await User.findOne({_id: req.user.id})
    if (!userFound) throw new Error('User not found')
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role
    })
  } catch (error) {
    res.status(500).json({ error: [error.message] })
  }
}

export const profile = async (req, res) => {
  console.log('profile')
  try {
    const userFound = await User.findOne({_id: req.user.id})
    if (!userFound) throw new Error('User not found')
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      birthdate: userFound.birthdate
    })
  } catch (error) {
    res.status(500).json({ error: [error.message] })
  }
}
