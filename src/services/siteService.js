const puppeteer = require('puppeteer')
const NotificationService = require('./notificationService')

class siteService {
  constructor() {
    this.startBrowser = this.startBrowser
  }

  async startBrowser() {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
    })
    const page = await browser.newPage()

    await page.setRequestInterception(true)
    page.on('request', (request) => {
      if (
        ['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1
      ) {
        request.abort()
      } else {
        request.continue()
      }
    })

    return { browser, page }
  }

  async reservate(linkID) {
    const { browser, page } = await this.startBrowser()

    try {
      page.goto(`https://www.eroguide.dk/get_fp_ad_profile?user_id=${linkID}`)

      const actionBtn = await page.waitForSelector(
        '.reserve-fp-ad-profile-btn',
        {
          timeout: 10000,
        }
      )

      await actionBtn.click()

      NotificationService.successReservation(linkID)

      browser.close()
    } catch (e) {
      await page.screenshot({
        path: `screen/fullpage${linkID}.png`,
        fullPage: true,
      })
      NotificationService.successReservation(linkID)
      console.log(`Action button wasn't found, ${Date.now()}`)

      browser.close()
    }
  }

  async findReservations(linkID) {
    const { browser, page } = await this.startBrowser()

    try {
      await page.goto(
        `https://www.eroguide.dk/get_fp_ad_profile?user_id=${linkID}`
      )

      const el = await page.evaluate(
        `document.querySelector('.cancel-reserve-fp-ad-profile-btn')`
      )

      if (el === null) {
        throw new Error('Not found')
      } else {
        browser.close()

        NotificationService.findedReservatedDay(linkID)
      }
    } catch (e) {
      browser.close()
    }
  }
}

module.exports = new siteService()
