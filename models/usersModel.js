var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  role: String,
  points: Number,
  hierarchy: [String],
  track: { type: Schema.Types.ObjectId, ref: "tracks" },
  stages: [{}],
  messages: [{
      text: String,
      date: Date
  }]
});

UserSchema.set("versionKey", false);
// UserSchema.set("autoIndex", false);
var Users = mongoose.model("users", UserSchema);
module.exports = Users;