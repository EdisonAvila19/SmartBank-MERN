import {z} from 'zod'
import { AccountTypeList } from '../../config.js'

export const createAccountSchema = z.object({
  accounttype: z.enum(AccountTypeList, {
    required_error: 'Account type is invalid'
  })
})
