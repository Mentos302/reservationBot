const cron = require('node-cron')
const bot = require('./bot')
const db = require('./database')
const accountFactory = require('./helpers/accountFactory')
const onceCron = require('./helpers/onceCron')

cron.schedule('30 21 * * *', async () => {
  const accounts = await accountFactory()

  await Promise.all(
    accounts.map(async (e) => {
      if (!e.link) {
        e = await e.loginAndSaveLink()
      }

      onceCron(`00 22 * * *`, () => {
        e.reservation()
      })
    })
  )
})

db.connection.once('open', async () => {
  console.log('Connected to MongoDB')
  bot.launch()
  console.log(`Bot has been started`)
})
