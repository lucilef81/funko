const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

require('../models/Funko');
const Funko = mongoose.model('funko');

router.get('/', (req, res) => {
  Funko.find()
    .sort({ date: 'desc' })
    .then(funkos => {
      res.render('index', {
        funkos,
      });
    });
});

router.get('/edit/:id', (req, res) => {
  Funko.findOne({
    _id: req.params.id,
  }).then(funko => {
    res.render('edit', {
      funko: funko,
    }, { 
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true 
    });
  });
});

router.post('/', (req, res) => {
  const { name, details, category, date } = req.body
  let errors = [];
  if (!name) {
    errors.push({ text: 'Please add a name' });
  }
  if (!details) {
    errors.push({ text: 'Please add some details' });
  }
  if (!category) {
    errors.push({ text: 'Please add a category' });
  }
  
  if (errors.length > 0) {
    res.render('add', {
      errors,
      name,
      details,
      category,
      date
    });
  } else {
    const newFunko = {
      name,
      details,
      category,
      date
    };
    new Funko(newFunko).save().then(funko => {
      console.log(funko)
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
