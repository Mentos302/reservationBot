const bot = require('../bot')

class NotificationService {
  async findedReservatedDay(linkID) {
    await bot.telegram.sendMessage(
      process.env.ADMIN_CHATID,
      `👋 <b>Удалось найти</b> забронированое рекламное место!\n\n<i>⚡️ Быстрый доступ</i>: https://www.eroguide.dk/get_fp_ad_profile?user_id=${linkID}`,
      {
        parse_mode: 'html',
      }
    )
  }

  async successReservation(linkID) {
    try {
      await bot.telegram.sendMessage(
        process.env.ADMIN_CHATID,
        `👋 <b>Удалось забронировать</b> рекламное место с аккаунта <code>ID#${linkID}</code>\n\n<i>⚡️ Быстрый доступ</i>: https://www.eroguide.dk/get_fp_ad_profile?user_id=${linkID}`,
        {
          parse_mode: 'html',
        }
      )
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new NotificationService()
