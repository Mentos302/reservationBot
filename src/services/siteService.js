const puppeteer = require('puppeteer')

class siteService {
  async getReservationLink(login, password) {
    const browser = await puppeteer.launch()

    try {
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

      await page.goto('https://www.eroguide.dk/forum/login/')

      await page.type('input[type="text"]', login)
      await page.type('input[type="password"]', password)

      await page.click('button[type="submit"]')
      await page.goto('https://www.eroguide.dk/Dashboard')

      const link = await page.evaluate(
        `document.querySelectorAll('.col-sm-4.tool')[1].querySelector('a').getAttribute('href')`
      )

      browser.close()

      return link
    } catch (e) {
      browser.close()

      console.log(e)
    }
  }

  async reservate(link) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    try {
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
}

module.exports = new siteService()
