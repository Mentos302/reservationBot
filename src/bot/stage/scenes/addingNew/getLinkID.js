module.exports = () => {
  const Scene = require('telegraf/scenes/base')

  const scene = new Scene('getemail')
  const controller = require('../../../controllers/accountsController')

  scene.enter(controller.reqLinkIDAccountToAdd)

  scene.on('text', controller.resLinkIDAccountToAdd)

  scene.on('message', controller.msgTypeError)

  return scene
}
