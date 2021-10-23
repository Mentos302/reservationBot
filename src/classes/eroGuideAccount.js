const siteService = require('../services/siteService')
const accountService = require('../services/accountService')

class eroGuideAccount {
  constructor(email, password, link = '') {
    this.email = email
    this.password = password
    this.link = link
  }

  async loginAndSaveLink() {
    this.link = await siteService.getReservationLink(this.email, this.password)

    await accountService.saveReservationLink(this.email, this.link)

    return this
  }

  async reservation() {
    const isSuccess = await siteService.reservate(this.link)

    if (isSuccess) {
      accountService.successNotification(this.email, this.link)
    }
  }
}

module.exports = eroGuideAccount
