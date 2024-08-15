import { Router } from 'express'
import { createTransaction, getTransactions } from '../controllers/transaction.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTransactionSchema } from '../schemas/transaction.schema.js'

const router = Router()

router
  .get('/:id', authRequired, getTransactions)
  .post('/', authRequired, validateSchema(createTransactionSchema), createTransaction)


export default router