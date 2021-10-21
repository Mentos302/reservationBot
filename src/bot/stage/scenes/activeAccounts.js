module.exports = () => {
  const Scene = require('telegraf/scenes/base')

  const scene = new Scene('activelist')
  const controller = require('../../controllers/accountsController')

  scene.enter(controller.getActiveAccounts)

  scene.action('add', controller.toAdding)
  scene.action('remove', controller.toRemoving)

  scene.on('message', (ctx) => ctx.scene.reenter())

  return scene
}
