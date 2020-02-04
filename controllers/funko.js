const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Funko');
const Funko = mongoose.model('funko');

router.get('/', (req, res) => {
  Funko.find({})
    .sort({ date: 'desc' })
    .then(funko => {
      res.render('index', {
        funko: funko,
      });
    });
});

router.get('/add', (req, res) => {
  res.render('add');
});

router.get('/edit/:id', (req, res) => {
  Funko.findOne({
    _id: req.params.id,
  }).then(funko => {
    res.render('edit', {
      funko: funko,
    });
  });
});

router.post('/', (req, res) => {
  let errors = [];
  if (!req.body.name) {
    errors.push({ text: 'Please add a name' });
  }
  if (!req.body.details) {
    errors.push({ text: 'Please add some details' });
  }
  if (errors.length > 0) {
    res.render('add', {
      errors: errors,
      name: req.body.name,
      details: req.body.details,
    });
  } else {
    const newUser = {
      name: req.body.name,
      details: req.body.details,
    };
    new Funko(newUser).save().then(funko => {
      req.flash('success_msg', 'Video idea added');
      res.redirect('/');
    });
  }
});

router.put('/:id', (req, res) => {
  Funko.findOne({
    _id: req.params.id,
  }).then(funko => {
    funko.name= req.body.name;
    funko.details = req.body.details;

    funko.save().then(funko => {
      req.flash('success_msg', 'Funko pop updated');
      res.redirect('/');
    });
  });
});

router.delete('/:id', (req, res) => {
  Funko.remove({ _id: req.params.id }).then(() => {
    req.flash('success_msg', 'Funko pop removed');
    res.redirect('/');
  });
});

module.exports = router;
