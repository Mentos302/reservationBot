const service = require('../services/accountsService')
const Extra = require('telegraf/extra')

class AccountControllers {
  constructor() {
    this.addNewAccount = this.addNewAccount
  }

  async getActiveAccounts(ctx) {
    try {
      const account = await service.getActiveAccounts()
      let msg = `💡 Активные аккаунты, <b>ожидающие на резервацию</b>:\n`

      account.forEach((e) => {
        msg += `\n<b>${e.email}</b>`
      })

      ctx.reply(
        msg,
        Extra.HTML().markup((m) =>
          m.inlineKeyboard([
            m.callbackButton(`📌 Добавить аккаунт`, 'add'),
            m.callbackButton(`❌ Убрать аккаунт`, 'remove'),
          ])
        )
      )
    } catch (e) {
      ctx.reply(`Произошла ошибка при получении аккаунтов, попробуйте позже.`)
    }
  }

  toAdding(ctx) {
    ctx.scene.enter('getemail')
  }

  toRemoving(ctx) {
    ctx.scene.enter('removeaccount')
  }

  reqEmailAccountToAdd(ctx) {
    ctx.reply(
      '📬 Введите <b>E-mail от аккаунта</b>, который хотите добавить.',
      Extra.HTML()
    )
  }

  resEmailAccountToAdd(ctx) {
    ctx.scene.enter('getpassword', { email: ctx.message.text })
  }

  reqPasswordAccountToAdd(ctx) {
    ctx.reply(
      '🔐 Введите <b>пароль от аккаунта</b>, который хотите добавить.',
      Extra.HTML()
    )
  }

  async resPasswordAccountToAdd(ctx) {
    try {
      const { email } = ctx.scene.state

      await service.addNewAccount(email, ctx.message.text)

      ctx.scene.enter('activelist')
    } catch (e) {
      ctx.reply('Ошибка при добавлении нового аккаунта, попробуйте ещё раз')
    }
  }

  reqEmailToRemove(ctx) {
    ctx.reply(
      '📬 Введите <b>E-mail от аккаунта</b>, который хотите убрать.',
      Extra.HTML()
    )
  }

  async resEmailToRemove(ctx) {
    try {
      const email = ctx.message.text

      await service.removeAccount(email)

      ctx.scene.enter('activelist')
    } catch (e) {
      ctx.reply('Ошибка при удалении аккаунта, попробуйте ещё раз.')
    }
  }

  msgTypeError(ctx) {
    ctx.reply('Не понимаю, введите текст!')

    ctx.scene.reenter()
  }
}

module.exports = new AccountControllers()
