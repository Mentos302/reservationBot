const siteService = require('../services/siteService')
const fs = require('fs').promises

class eroGuideAccount {
  constructor(login, password) {
    this.login = login
    this.password = password
    this.saveCookie = this.saveCookie
  }

  async loginAndSaveProxy() {
    const cookie = await siteService.signIn(this.login, this.password)

    await this.saveCookie(this.login, cookie)
  }

  async saveCookie(login, cookie) {
    await fs.writeFile(`cookies/${login}.json`, JSON.stringify(cookie))
  }

  async reservation() {
    const cookiesString = await fs.readFile(`cookies/${this.login}.json`)
    const cookies = JSON.parse(cookiesString)

    await siteService.reservate(cookies)
  }
}

module.exports = eroGuideAccount
