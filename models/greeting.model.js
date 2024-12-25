const mongoose = require("mongoose");

const greetingSchema = new mongoose.Schema({
   shortId: {
      type: String,
      required: true,
      unique: true
   },
   message:{
      type: String,
      required: false,
      unique: false
   },
   fromUser: {
      type: String
   }
})

const GREETING = mongoose.model("greeting", greetingSchema)
module.exports = GREETING