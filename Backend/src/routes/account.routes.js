import { Router } from 'express'
import { createAccount, deleteAccount, getAccount, getAccounts, updateAccount } from '../controllers/account.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createAccountSchema } from '../schemas/account.schema.js'

const router = Router()

router
  .get('/', authRequired, getAccounts)
  .get('/:id', authRequired, getAccount)
  .post('/', authRequired, validateSchema(createAccountSchema), createAccount)
  // .put('/:id', authRequired, updateAccount)
  // .delete('/:id', authRequired, deleteAccount)

export default router
