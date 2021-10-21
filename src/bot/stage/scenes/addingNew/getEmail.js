module.exports = () => {
  const Scene = require('telegraf/scenes/base')

  const scene = new Scene('getemail')
  const controller = require('../../../controllers/accountsController')

  scene.enter(controller.reqEmailAccountToAdd)

  scene.on('text', controller.resEmailAccountToAdd)

  scene.on('message', controller.msgTypeError)

  return scene
}
