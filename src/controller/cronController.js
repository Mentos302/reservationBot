const fs = require('fs')
const cron = require('node-cron')
const onceCron = require('../helpers/onceCron')
const siteService = require('../services/siteService')
const accountFactory = require('../helpers/accountFactory')
const accountService = require('../services/accountService')
const scanAvailibleAccounts = require('../services/scanAvalilibleService')

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

  async scanAvailibleAccounts() {
    try {
      await scanAvailibleAccounts()

      cron.schedule('12 10 8,18,28 * *', async () => {
        await scanAvailibleAccounts()
      })
    } catch (e) {
      console.log(e)
    }
  }

  async _scanner() {
    const accounts = await accountService.getAll()

    const rawdata = fs.readFileSync('activeIDs.json')
    let linkIDs = JSON.parse(rawdata)

    accounts.map((e) => (linkIDs = linkIDs.filter((link) => link != e.linkID)))

    for (const id of linkIDs) {
      await siteService.findReservations(id)
    }
  }

  async scannerInit() {
    try {
      await _scanner()

      cron.schedule('00 15 * * *', async () => {
        await _scanner()
      })
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new SiteController()
