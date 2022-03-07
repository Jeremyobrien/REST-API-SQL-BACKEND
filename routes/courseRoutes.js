const express = require('express');
const router = express.Router();
const { courses } = require('../seed/data.json')
const { Course } = require('../models')
let createError = require('http-errors')
const { check, validationResult } = require('express-validator');

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

router.get('/', asyncHandler(async (req, res) =>{
    const courses = await Course.findAll();
    res.json(courses);
}));

router.get('/:id', asyncHandler(async (req, res) =>{
    const course = await Course.findByPk(req.params.id);
    if (course){
        res.json(course);
    } else {
        res.status(404).json({ message: 'The course you requested cannot be found.'});
    }
}));

router.post('/', [
    check('title')
        .exists()
        .withMessage('Please provide a value for "title"'),
    check('description')
        .exists()
        .withMessage('Please provide a value for "description"')
], asyncHandler(async (req, res)=> {
    const errors = validationResult(req);
    const data = req.body;
    if ( !errors.isEmpty()) {
      const errorMessages = errors.array().map( error => error.msg);
      res.status(400).json({ errors: errorMessages });
    }
        const course = await Course.create({
            title: data.title,
            description: data.description,
            estimatedTime: data.estimatedTime,
            materialsNeeded: data.materialsNeeded,
            userId: data.userId
        });
        if (course) {
            await courses.push(course);
            await res.status(201)
                     .location(`/${course.id}`)
                     .end();
        }
}));

router.put('/:id', asyncHandler( async (req, res) => {
    if ( !req.body.title || !req.body.description) {
        res.status(400).json({ message: '"Title" and "Description" values required'})
    } else {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        course.title = req.body.title;
        course.description = req.body.description;
        course.estimatedTime = req.body.estimatedTime;
        course.materialsNeeded = req.body.materialsNeeded;
        course.userId = req.body.userId;
        await course.save();
        res.status(204).end();
    }
}
}))

router.delete('/:id', asyncHandler( async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        await course.destroy();
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Course Not Found"})
    }
}));


module.exports = router;