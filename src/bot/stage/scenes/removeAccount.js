module.exports = () => {
  const Scene = require('telegraf/scenes/base')

  const scene = new Scene('removeaccount')
  const controller = require('../../controllers/accountsController')

  scene.enter(controller.reqEmailToRemove)

  scene.on('text', controller.resEmailToRemove)

  scene.on('message', controller.msgTypeError)

  return scene
}
