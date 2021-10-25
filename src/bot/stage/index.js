const Stage = require('telegraf/stage')

module.exports = (bot) => {
  const ActiveAccountsList = require('./scenes/activeAccounts')()
  const ReqLinkID = require('./scenes/addingNew/getLinkID')()
  const RemoveAccount = require('./scenes/removeAccount')()

  const stage = new Stage([ActiveAccountsList, ReqLinkID, RemoveAccount], {
    ttl: 120,
  })

  bot.use(stage.middleware())
}
