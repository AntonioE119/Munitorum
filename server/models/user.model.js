import mongoose, { model, Schema } from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"
import validator from 'validator'
const { isEmail } = validator
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name required"],
    minLength: [2, "First name must be at least 2 characters"],
    maxLength: [40, "First name cannot exceed 40 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last name required"],
    minLength: [2, "Last name must be at least 2 characters"],
    maxLength: [40, "Last name cannot exceed 40 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Not a valid email"],
    unique: [true, "Email already exists"]
  },
  password: {
    type: String,
    required: [true, "Pssword is required"],
    minLength: [8, "Password must be at least 8 characters long"],
    maxLength: [20, "password cannot exceed 20 characters"]
  },
  factions: [{ type: Schema.Types.ObjectId, ref: 'Faction'}],
  miniatures: [{type: Schema.Types.ObjectId, ref: 'Miniature'}]
}, {timestamps:true})
UserSchema.plugin(mongooseUniqueValidator)


// Middleware
UserSchema.virtual('confirmPassword')
  .get(function() {
    return this._confirmPassword
  })
  .set(function(value) {
    this._confirmPassword = value
  })

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Passwords do not match')
  }
  next()
})

UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      console.log("HASH: ", hash)
      this.password = hash
      next()
    })
})

const User = model('User', UserSchema);
export default User;