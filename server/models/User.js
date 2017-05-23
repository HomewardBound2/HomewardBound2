const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  queries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Query'
  }]
})


// add bcrypt hashing to model (works on a password field)!
// adds password digest
userSchema.plugin(require('mongoose-bcrypt'));

userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
