import { RoleList, AccountTypeList, BankList } from '../../config.js'
import accountType from '../models/accountType.model.js'
import Bank from '../models/bank.model.js'
import Role from '../models/role.model.js'

export default async function setupCollections () {
  try {
    const atCount = await accountType.countDocuments()
    if (atCount === 0) {
      await accountType.create(AccountTypeList.map(type => ({name: type})))
    }

    const rCount = await Role.countDocuments()
    if (rCount === 0) {
      
      await Role.create(RoleList.map(type => ({type: type})))
    }

    const bCount = await Bank.countDocuments()
    if (bCount === 0) {
      await Bank.create(BankList.map(type => ({name: type})))
    }

    console.log('Collections created')
  } catch (error) {
    console.log(error)
  }
}