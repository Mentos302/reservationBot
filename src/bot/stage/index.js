const Stage = require('telegraf/stage')

module.exports = (bot) => {
  const ActiveAccountsList = require('./scenes/activeAccounts')()
  const ReqEmailToAdd = require('./scenes/addingNew/getEmail')()
  const ReqPasswordToAdd = require('./scenes/addingNew/getPassword')()
  const RemoveAccount = require('./scenes/removeAccount')()

  const stage = new Stage(
    [ActiveAccountsList, ReqEmailToAdd, ReqPasswordToAdd, RemoveAccount],
    {
      ttl: 120,
    }
  )

  bot.use(stage.middleware())
}
