const express = require('express');
const router = express.Router();
const { users } = require('../seed/data.json')
const { User } = require('../models')
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//Handle requests and pass them to global handler
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      // Forward error to the global error handler
      next(err);
    }
  }
}

router.get('/', asyncHandler( async (req, res)=> {
   await res.json({ users });
  }))

router.post('/', asyncHandler( async (req, res)=> {
    const data = req.body;
    const errors = [];
    if (!data.firstName){
      errors.push('Please provide a properly formatted "first name"');
    }
    if (!data.lastName){
      errors.push('Please provide a "last name"');
    }
    if (!data.emailAddress){
      errors.push('Please provide a valid "email"');
    }
    if (!data.password){
      errors.push('Please provide a "password"');
    } else if (password.length < 8 || password.length > 20) {
      errors.push('Your password should be between 8 and 20 characters');
    } else {
      data.password = bcrypt.hashSync(data.password, 10);
    }
    if (errors.length > 0) {
      res.status(400).json({ errors });
    } else {
      const user = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        password: data.password
      });
      await users.push(user);
      await res.status(201)
                .location('/')
                .end();
    }
}));

  module.exports = router;