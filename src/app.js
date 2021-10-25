const bot = require('./bot')
const db = require('./database')
const CronService = require('./services/cronService')

CronService.reservationInit()
CronService.cancellingScanInit()

db.connection.once('open', async () => {
  console.log('Connected to MongoDB')
  bot.launch()
  console.log(`Bot has been started`)
})
