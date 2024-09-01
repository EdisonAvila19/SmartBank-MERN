import Transaction from '../models/transaction.model.js'
import Account from '../models/account.model.js'

export async function getTransactions (req, res) {
  const transactions = await Transaction.find({$or: [
    {sourceAccount: req.params.id},
    {destinationAccount: req.params.id}
  ]})
  if (!transactions || transactions.length === 0) return res.status(404).json({ error: 'Transactions not found' })
  const transactionsWithBalance = transactions.map(transaction => {
    const accountBalance = req.params.id == transaction.sourceAccount
      ? transaction.sourceAccountBalance
      : transaction.destinationAccountBalance
    return ({
      id: transaction._id,
      createdAt: transaction.createdAt,
      sourceAccount: transaction.sourceAccount,
      destinationAccount: transaction.destinationAccount,
      amount: transaction.amount,
      description: transaction.description,
      balance: accountBalance
    })
  })
  res.json(transactionsWithBalance)
} 

export async function createTransaction (req, res) {
  let sourceAccountBalance = null
  let destinationAccountBalance = null
  try {
    const sourceAccountFound = await Account.findOne({_id: req.body.sourceAccount, user: req.user.id})
    if (!sourceAccountFound) throw new Error('Source account not found')
    sourceAccountBalance = sourceAccountFound.balance

    const destinationAccountFound = await Account.findOne({_id: req.body.destinationAccount})
    if (!destinationAccountFound) throw new Error('Destination account not found')
    destinationAccountBalance = destinationAccountFound.balance

    const isValidAccounts = sourceAccountFound._id !== destinationAccountFound._id
    if (!isValidAccounts) throw new Error('Source and destination accounts are the same')
    const isValidAmmount = sourceAccountBalance - req.body.amount >= 0
    if (!isValidAmmount) throw new Error('Not enough money for this transaction')
    
    const sourceFinalBalance = sourceAccountBalance - req.body.amount
    await Account.findOneAndUpdate({_id: req.body.sourceAccount, user: req.user.id}, {balance: sourceFinalBalance}, {new: true})

    const destinationFinalBalance = destinationAccountBalance + req.body.amount
    await Account.findOneAndUpdate({_id: req.body.destinationAccount}, {balance: destinationFinalBalance}, {new: true})
    
    const newTransaction = new Transaction ({
      sourceAccount: sourceAccountFound._id,
      destinationAccount: destinationAccountFound._id,
      sourceAccountBalance: sourceFinalBalance,
      destinationAccountBalance: destinationFinalBalance,
      amount: req.body.amount,
      description: req.body.description
    })

    const savedTransaction = await newTransaction.save()
    
    res.json({
      user: req.user.id,
      id: savedTransaction._id,
      sourceAccount: savedTransaction.sourceAccount,
      destinationAccount: savedTransaction.destinationAccount,
      amount: savedTransaction.amount,
      description: savedTransaction.description
    })

  } catch (error) {
    res.status(500).json({ error: [error.message] })
  }
}