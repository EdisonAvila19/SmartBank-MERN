import {z} from 'zod'

export const createTransactionSchema = z.object({
  sourceAccount: z.string({
    required_error: 'Source account is required'
  }),
  destinationAccount: z.string({
    required_error: 'Destination account is required'
  }),
  amount: z.number({
    required_error: 'Amount is required'
  }).min(1),
  description: z.string({
    required_error: 'Description is required'
  })
})