const { Account } = require('../database')
const eroGuideAccount = require('../classes/eroGuideAccount')

module.exports = async () => {
  const instances = []
  const accounts = await Account.find()

  accounts.forEach((e) => {
    const account = new eroGuideAccount(e.linkID)

    instances.push(account)
  })

  return instances
}
