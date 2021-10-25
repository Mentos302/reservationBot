const bot = require('../bot')

class NotificationService {
  async sendMessage(msg) {
    await bot.telegram.sendMessage(process.env.ADMIN_CHATID, msg, {
      parse_mode: 'html',
    })
  }
}

module.exports = new NotificationService()
