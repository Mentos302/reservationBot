const mongoose = require('mongoose')

const accountScheme = mongoose.Schema(
  {
    linkID: {
      type: String,
      unique: true,
    },
  },
  { versionKey: false }
)

module.exports = accountScheme
