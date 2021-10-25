const { Account } = require('../../database')

class AccountsService {
  async getActiveAccounts() {
    try {
      const accounts = await Account.find()

      return accounts
    } catch (e) {
      console.log(e)

      throw new Error(e)
    }
  }

  async addNewAccount(linkID) {
    try {
      const account = await Account.create({ linkID })

      return account
    } catch (e) {
      console.log(e)

      throw new Error(e)
    }
  }

  async removeAccount(linkID) {
    try {
      const account = await Account.deleteOne({ linkID })

      return account
    } catch (e) {
      console.log(e)

      throw new Error(e)
    }
  }
}

module.exports = new AccountsService()
