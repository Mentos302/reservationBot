const mongoose = require('mongoose')

const accountScheme = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    reservationLink: {
      type: String,
    },
  },
  { versionKey: false }
)

module.exports = accountScheme
