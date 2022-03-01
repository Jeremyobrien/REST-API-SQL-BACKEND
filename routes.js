const express = require('express');
const router = express.Router();
const { users, courses } = require('./seed/data.json')
const { User, Course } = require('./models')

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
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    });
    if (user) {
      res.status(201).json(user);
    } else {
      res.status(400).json({ message: "Please enter all requested information for new 'User'"});
    }

}));

  module.exports = router;