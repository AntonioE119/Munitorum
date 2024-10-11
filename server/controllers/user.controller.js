import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserController = {
  register: async (req, res) => {
    try {
      // Create a new user with form data
      const newUser = await User.create(req.body)
      console.log("NEW USER: ", newUser);
      // Generate JWT and send with response
      const userToken = jwt.sign(
        {userId: newUser._id},
        process.env.SECRET_KEY
      )
      res.cookie('userToken', userToken, {httpOnly: true})
      res.status(201).json(newUser)
    }
    catch(err) {
      res.status(500).json(err)
    }
  },
  login: async (req, res) => {
    try {
      // Check if the user exists by email
      const {email, password} = req.body
      const potentialUser = await User.findOne({email})
      if (!potentialUser) {
        return res.status(404).json({message: 'User not found. Please register.'})
      }
      // If user found, check to see if passwords match
      const passwordsMatch = await bcrypt.compare(password, potentialUser.password)
      if (!passwordsMatch) {
        return res.status(400).json({message: 'Invalid Email and/or Password'})
      }
      // Log user in (generate JWT)
      const userToken = jwt.sign(
        {userId: potentialUser._id},
        process.env.SECRET_KEY
      )
      res.cookie('userToken', userToken, {httpOnly: true})
      res.status(201).json(potentialUser)
    }
    catch(err) {
      res.status(500).json(err)
    }
  },
  logout: async (req, res) => {
    res.clearCookie('userToken')
    res.status(200).json({message: "Successfully logged out"})
  },
  getLoggedInUser: async (req, res) => {
    try {
      const {id} = req.params;
      const user = await User.findById(id)
      res.status(200).json(user)
    }
    catch(err) {
      res.status(500).json(err)
    }
  }
}

export default UserController;