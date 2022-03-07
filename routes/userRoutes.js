const express = require('express');
const router = express.Router();
const { users } = require('../seed/data.json')
const { User } = require('../models')
const bcrypt = require('bcrypt');
const { authenticateUser } = require('../middleware/auth-user');
const { body, check, validationResult } = require('express-validator');

// const bodyParser = require('body-parser')
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

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

router.get('/', authenticateUser, asyncHandler( async (req, res)=> {
   const user = req.currentUser;
   res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password
   })
  }))


router.post('/', [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "first name"'),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "last name"'),
  check('emailAddress')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "email"')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "password"')
], asyncHandler( async (req, res)=> {
    const errors = validationResult(req);
    const data = req.body;
    if ( !errors.isEmpty()) {
      const errorMessages = errors.array().map( error => error.msg);
      res.status(400).json({ errors: errorMessages });
    } else {
      const encrytedPassword = data.password = bcrypt.hashSync(data.password, 10);
      const user = await User.create({
        firstName: data.firstName,
        lastName: data.lastName,
        emailAddress: data.emailAddress,
        password: encrytedPassword
      });
      await users.push(user);
      await res.status(201)
                .location('/')
                .end();
    }
}));

  module.exports = router;