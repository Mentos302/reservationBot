const { User } = require('../../database')

module.exports = async (ctx) => {
  const chat_id = ctx.from.id
  const user = await User.findOne({ chat_id })

  if (!user) {
    try {
      User.create({
        chat_id,
      })
    } catch (e) {
      console.log(e)
    }
  } else {
    user.is_admin
      ? ctx.scene.enter('activelist')
      : ctx.reply('🔒 Доступ запрещён!')
  }
}
