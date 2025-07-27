const mongoose = require("mongoose");
const AuthSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
  },
  expire: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  otp: String,
  otp_expire: String,
  verify_token: String,
});
const Auth = mongoose.model("Auth", AuthSchema);
module.exports = Auth;
