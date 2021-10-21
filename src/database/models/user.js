const mongoose = require('mongoose')

const userScheme = mongoose.Schema(
  {
    chat_id: {
      type: Number,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
)

module.exports = userScheme
