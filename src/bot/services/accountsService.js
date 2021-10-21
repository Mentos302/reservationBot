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

  async addNewAccount(email, password) {
    try {
      const account = await Account.create({
        email,
        password,
      })

      return account
    } catch (e) {
      console.log(e)

      throw new Error(e)
    }
  }

  async removeAccount(email) {
    try {
      const account = await Account.deleteOne({ email })

      return account
    } catch (e) {
      console.log(e)

      throw new Error(e)
    }
  }
}

module.exports = new AccountsService()
