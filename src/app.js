const bot = require('./bot')
const db = require('./database')
const CronController = require('./controller/cronController')

// CronController.reservationInit()
CronController.scannerInit()

db.connection.once('open', async () => {
  console.log('Connected to MongoDB')
  bot.launch()
  console.log(`Bot has been started`)
})
