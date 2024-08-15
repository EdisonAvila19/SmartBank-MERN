import {z} from 'zod'

export const loginSchema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }),
  password: z.string({
    required_error: 'Password is required'
  })
})

export const registerSchema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }),
  email: z.string({
    required_error: 'Email is required'
  }).email({
    required_error: 'Invalid email'
  }),
  password: z.string({
    required_error: 'Password is required'
  }),
  birthdate: z.string({
    required_error: 'Birthdate is required'
  }).date({
    required_error: 'Invalid birthdate'
  })
})