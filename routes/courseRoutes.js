const express = require('express');
const router = express.Router();
const { courses } = require('../seed/data.json')
const { Course } = require('../models')
let createError = require('http-errors')

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

router.post('/', asyncHandler(async (req, res)=> {
    if (req.body.title && req.body.description){
        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            userId: req.body.userId
        });
        await courses.push(course);
        await res.status(201)
                 .location(`/${course.id}`)
                 .end();
    } else {
        res.status(400).json({message: "Title and Description required"});
    }
}));

router.put('/:id', asyncHandler( async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        course.title = req.body.title;
        course.description = req.body.description;
        course.estimatedTime = req.body.estimatedTime;
        course.materialsNeeded = req.body.materialsNeeded;
        course.userId = req.body.userId;
        await course.save();
        res.status(204).end();
    } else {
        res.status(404).json({ message: "Course Not Found"})
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