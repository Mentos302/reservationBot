const { Account } = require('../database')
const bot = require('../bot')

class accountService {
  async getAll() {
    try {
      const account = await Account.find()

      return account
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new accountService()
