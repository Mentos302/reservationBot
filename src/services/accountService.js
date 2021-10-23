const { Account } = require('../database')
const bot = require('../bot')

class accountService {
  async saveReservationLink(email, reservationLink) {
    try {
      const account = await Account.updateOne({ email }, { reservationLink })

      return account
    } catch (e) {
      console.log(e)
    }
  }

  async successNotification(email, link) {
    try {
      await bot.telegram.sendMessage(
        process.env.ADMIN_CHATID,
        `👋 <b>Удалось забронировать</b> рекламное место с аккаунта <code>${email}</code>\n\n<i>⚡️ Быстрый доступ</i>: https://www.eroguide.dk${link}`,
        {
          parse_mode: 'html',
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new accountService()
