const cron = require('node-cron')
const accountFactory = require('./helpers/accountFactory')
const onceCron = require('./helpers/onceCron')

class CronService {
  async reservationInit() {
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
  }

  async cancellingScanInit() {}
}

module.exports = new CronService()
