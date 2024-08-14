import User from '../models/user.model.js'

export const login = (req, res) => {
  console.log(req.body)
  const { username } = req.body

  

  res.send(`Hello ${username}`)

}


export const register = async (req, res) => {
  console.log('register')
  try {
    const { username, email, password } = req.body
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    })

    const savedUser = await newUser.save()
    res.json(savedUser)
    
  } catch (error) {
    res.status(400).json({ error: [error.message] })
  }
}