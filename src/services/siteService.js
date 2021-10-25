const puppeteer = require('puppeteer')
const NotificationService = require('./notificationService')

class siteService {
  constructor() {
    this.startBrowser = this.startBrowser
  }

  async startBrowser() {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        `--proxy-server=138.59.204.110:9594`,
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    })
    const page = await browser.newPage()

    await page.authenticate({
      username: 'Jq4uat',
      password: 'X0vZg3',
    })

    // await page.setRequestInterception(true)
    // page.on('request', (request) => {
    //   if (
    //     ['image', 'stylesheet', 'font'].indexOf(request.resourceType()) !== -1
    //   ) {
    //     request.abort()
    //   } else {
    //     request.continue()
    //   }
    // })

    return { browser, page }
  }

  async reservate(linkID) {
    const { browser, page } = await this.startBrowser()

    try {
      page.goto(`https://www.eroguide.dk${link}`)

      const actionBtn = await page.waitForSelector(
        '.reserve-fp-ad-profile-btn',
        {
          timeout: 30000,
        }
      )

      await actionBtn.click()

      browser.close()

      return true
    } catch (e) {
      await page.screenshot({
        path: `screen/fullpage${link[0]}.png`,
        fullPage: true,
      })
      console.log(`Action button wasn't found, ${Date.now()}`)
      console.log(e)

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
