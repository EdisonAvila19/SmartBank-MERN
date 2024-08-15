import Account from '../models/account.model.js'
import AccountType from '../models/accountType.model.js'
import User from '../models/user.model.js'

export async function getAccounts (req, res) {
  try {
    const accounts =await Account.find({user: req.user.id}).populate('accounttype')
    if (!accounts || accounts.length === 0) throw new Error('No accounts found')
    res.send(accounts.map(account => ({
      id: account._id,
      accounttype: account.accounttype.name,
      balance: account.balance
    })))
  } catch (error) {
    res.status(404).json({ error: [error.message] })
  }
}

export async function getAccount (req, res) {
  try {
    const accountFound = await Account.findOne({_id: req.params.id, user: req.user.id}).populate('accounttype')
    if (!accountFound) throw new Error('Account not found')
    res.json({
      id: accountFound._id,
      accounttype: accountFound.accounttype.name,
      balance: accountFound.balance
    })
  } catch (error) {
    res.status(404).json({ error: [error.message] })
  }
}

export async function createAccount (req, res) {
  console.log('create Account')
  try {
    const userFound = await User.findOne({_id: req.user.id})
    if (!userFound) throw new Error('User not found')
  
    const accountTypeFound = await AccountType.findOne({name: req.body.accounttype})
    if (!accountTypeFound) throw new Error('Account type not found')

    const newAccount = new Account ({
      user: userFound._id,
      accounttype: accountTypeFound._id
    })
    const savedAccount = await newAccount.save()
    res.send(savedAccount)
  } catch (error) {
    res.status(500).json({ error: [error.message] })  
  }
}

export function updateAccount (req, res) {
  res.send('update Account')
}

export function deleteAccount (req, res) {
  res.send('delete Account')
}