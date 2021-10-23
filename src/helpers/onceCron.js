const cron = require('node-cron')

module.exports = (cronScheme, fn) => {
  let isDone = false

  const scheduleAction = cron.schedule(cronScheme, () => {
    if (isDone) {
      scheduleAction.stop()
    } else {
      fn()
      isDone = true
    }
  })
}
