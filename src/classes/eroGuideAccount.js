const siteService = require('../services/siteService')
const accountService = require('../services/accountService')

class eroGuideAccount {
  constructor(linkID) {
    this.linkID = linkID
  }

  async reservation() {
    const { linkID } = this

    const isSuccess = await siteService.reservate(linkID)

    if (isSuccess) {
      accountService.successNotification(linkID)
    }
  }
}

module.exports = eroGuideAccount
