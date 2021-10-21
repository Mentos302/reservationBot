const eroGuideAccount = require('./classes/eroGuideAccount')
const cron = require('node-cron')
const bot = require('./bot')
const db = require('./database')

;(async () => {
  const login = 'Sashaa'

  const account = new eroGuideAccount(login, 'q6EKV0HASDbzsmr')

  cron.schedule('50 21 * * *', () => {
    account.loginAndSaveProxy()

    console.log('cookies successfully saved!')
  })

  cron.schedule('59 59 21 * * *', () => {
    const isReservated = account.reservation()

    console.log(`'59 browser has been started`)
  })
})()

db.connection.once('open', async () => {
  console.log('Connected to MongoDB')
  bot.launch()
  console.log(`Bot has been started`)
})
