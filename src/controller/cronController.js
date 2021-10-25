const fs = require('fs')
const cron = require('node-cron')
const onceCron = require('../helpers/onceCron')
const siteService = require('../services/siteService')
const accountService = require('../services/accountService')

class SiteController {
  async reservationInit() {
    try {
      cron.schedule('30 21 * * *', async () => {
        const accounts = await accountFactory()

        accounts.map((e) => {
          onceCron(`00 22 * * *`, () => {
            e.reservation()
          })
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  async scannerInit() {
    try {
      cron.schedule('00 15 * * *', async () => {
        const accounts = await accountService.getAll()

        const rawdata = fs.readFileSync('activeIDs.json')
        let linkIDs = JSON.parse(rawdata)

        accounts.map(
          (e) => (linkIDs = linkIDs.filter((link) => link != e.linkID))
        )

        for (const id of linkIDs) {
          await siteService.findReservations(id)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new SiteController()
