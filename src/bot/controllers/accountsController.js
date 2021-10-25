const service = require('../services/accountsService')
const Extra = require('telegraf/extra')

class AccountControllers {
  constructor() {
    this.addNewAccount = this.addNewAccount
  }

  async getActiveAccounts(ctx) {
    try {
      const account = await service.getActiveAccounts()
      let msg = `💡 Активные аккаунты, <b>ожидающие на резервацию: [${account.length}]</b>\n`

      account.forEach((e) => {
        msg += `\nID: <b>${e.linkID}</b>`
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

  reqLinkIDAccountToAdd(ctx) {
    ctx.reply(
      '📬 Введите <b>ID аккаунта</b>, который хотите добавить.',
      Extra.HTML()
    )
  }

  async resLinkIDAccountToAdd(ctx) {
    try {
      const { text } = ctx.message

      await service.addNewAccount(text)

      await ctx.reply(
        `Аккаунт <b>ID#${text}</b> успешно добавлен.`,
        Extra.HTML()
      )

      ctx.scene.enter('activelist')
    } catch (e) {
      ctx.reply('Ошибка при добавлении нового аккаунта, попробуйте ещё раз')
    }
  }

  reqLinkIDToRemove(ctx) {
    ctx.reply(
      '📬 Введите <b>ID аккаунта</b>, который хотите убрать.',
      Extra.HTML()
    )
  }

  async resLinkIDToRemove(ctx) {
    try {
      const linkID = ctx.message.text

      await service.removeAccount(linkID)

      await ctx.reply(
        `Аккаунт <b>ID#${linkID}</b> успешно удалён.`,
        Extra.HTML()
      )

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
