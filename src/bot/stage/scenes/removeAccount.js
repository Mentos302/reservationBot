module.exports = () => {
  const Scene = require('telegraf/scenes/base')

  const scene = new Scene('removeaccount')
  const controller = require('../../controllers/accountsController')

  scene.enter(controller.reqLinkIDToRemove)

  scene.on('text', controller.resLinkIDToRemove)

  scene.on('message', controller.msgTypeError)

  return scene
}
