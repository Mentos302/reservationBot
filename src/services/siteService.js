const puppeteer = require('puppeteer')

class siteService {
  async signIn(login, password) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    })

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
      const cookie = await page.cookies()

      browser.close()

      return cookie
    } catch (e) {
      browser.close()

      console.log(e)
    }
  }

  async reservate(cookies) {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"]
    })

    try {
      const start = new Date().getTime()

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

      await page.setCookie(...cookies)

      page.goto('https://www.eroguide.dk/get_fp_ad_profile?user_id=35122')

      const end = new Date().getTime()

      console.log(`LoadingTesting: [${end - start}ms]`)

      const actionBtn = await page.waitForSelector(
        '.reserve-fp-ad-profile-btn',
        {
          timeout: 30000,
          visible: true,
        }
      )

      await page.screenshot({ path: 'fullpage.png', fullPage: true });
      
      await actionBtn.click()

      console.log(`Succesfully reserved by ${login}`)

      browser.close()
    } catch (e) {
      console.log(`Action button wasn't found, ${Date.now()}`)

      browser.close()
    }
  }
}

module.exports = new siteService()
