const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  watchlist: {
    type: [Schema.Types.ObjectId],
    ref: "Issue",
    default: []
  }
});

userSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    return next();
  });
});

userSchema.methods.checkPassword = function(passwordAttempt, cb) {
  const user = this.toObject();
  bcrypt.compare(passwordAttempt, user.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    return cb(null, isMatch);
  });
};

userSchema.methods.withoutPassword = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model("User", userSchema);