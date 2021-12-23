const puppeteer = require('puppeteer')
var fs = require('fs')

module.exports = async () => {
  const check = async (id) => {
    const browser = await puppeteer.launch({
      //   args: ['--no-sandbox'],
      headless: true,
      args: [
        `--proxy-server=138.59.204.110:9594`,
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
      ],
    })

    try {
      const page = await browser.newPage()

      await page.authenticate({
        username: 'Jq4uat',
        password: 'X0vZg3',
      })

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

      await page.goto(`https://www.eroguide.dk/get_fp_ad_profile?user_id=${id}`)

      const el = await page.evaluate(
        `document.querySelector('#ad-highlight-text')`
      )

      if (el === null) {
        throw new Error('Not found')
      } else {
        browser.close()

        return id
      }
    } catch (e) {
      console.log(e)
      browser.close()
    }
  }

  let rawdata = fs.readFileSync('activeIDs.json')
  const activeIDs = JSON.parse(rawdata)

  const array = []

  for (let i = activeIDs[activeIDs.length - 1] + 1; i < 999999; i++) {
    array.push(i)
  }

  async function processArray(array) {
    for (const num of array) {
      let id = await check(num)

      if (id) {
        last_finded = id
        activeIDs.push(id)
      } else if (num - activeIDs[activeIDs.length - 1] > 10000) {
        break
      }
    }

    fs.writeFile('activeIDs.json', JSON.stringify(activeIDs), function (err) {
      if (err) {
        console.error('Crap happend')
      }
    })
  }

  processArray(array)
}
