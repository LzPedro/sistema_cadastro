const Cidade = require('../models/Cidade');
const bodyParser = require('body-parser');
const express = require('express');
const jsonParser = bodyParser.json()
const router = express.Router();


//CREATE cidade
router.post('/', jsonParser, (req, res, next) => {
    try {
      var city = new Cidade(req.body)//create a city from the http request body
      city.save(function (error,ans) {//save city inside mongodb
        if (error) {
          res.status(400)
          res.json({ message: error.message })
        }
        res.json(ans)
      });
    } catch (error) {
      res.status(400)
      res.json({ message: error })
    }
  })
  
  
  //CITY by name
  router.get('/name/:city_name', jsonParser, (req, res, next) => {
    try {
      Cidade.find({ Nome: req.params.city_name }).then(cities => {//search city by name in mongodb
        if (cities.length > 0) {//If not empty, found a document to return
          res.status(200)
          res.json(cities)
        }
        else {//No document was found
          res.status(404)
          res.json({ message: 'City not found' })
        }
        return next()
      })
    } catch (error) {
      res.status(400)
      res.json({ message: error })
    }
  })
  
  //CITY by state
  router.get('/estado/:city_state', jsonParser, (req, res, next) => {
    try {
      Cidade.find({ Estado: req.params.city_state }).then(cities => {//search city by state in mongodb
        if (cities.length > 0) {//If not null, found a document to return
          res.status(200)
          res.json(cities)
        }
        else {//No document was found
          res.status(404)
          res.json({ message: 'City not found' })
        }
        return next()
      })
    } catch (error) {
      res.status(400)
      res.json({ message: error })
    }
  })

  module.exports = router;