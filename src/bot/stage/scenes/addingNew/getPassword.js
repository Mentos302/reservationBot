module.exports = () => {
  const Scene = require('telegraf/scenes/base')

  const scene = new Scene('getpassword')
  const controller = require('../../../controllers/accountsController')

  scene.enter(controller.reqPasswordAccountToAdd)

  scene.on('text', controller.resPasswordAccountToAdd)

  scene.on('message', controller.msgTypeError)

  return scene
}
