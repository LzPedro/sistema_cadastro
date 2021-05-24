const Cidade = require('./models/Cidade');
const Cliente = require('./models/Cliente');
const bodyParser = require('body-parser');
const express = require('express');
const jsonParser = bodyParser.json()
const router = express.Router();




//CREATE cidade
router.post('/cidade', jsonParser, (req, res, next) => {
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
  
  //CREATE cliente
  router.post('/cliente', jsonParser, (req, res, next) => {
    try {
      let client = new Cliente(req.body)//create a client from the http request body
      client.save(function (error,ans) {//save client inside mongodb
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
  router.get('/cidade/name/:city_name', jsonParser, (req, res, next) => {
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
  router.get('/cidade/estado/:city_state', jsonParser, (req, res, next) => {
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
  
  //CLIENT by name
  router.get('/cliente/name/:client_name', jsonParser, (req, res, next) => {
    try {
      Cliente.find({ nome_completo: req.params.client_name }).then(client => {//search client by name in mongodb
        if (client.length > 0) {//If not null, found a document to return
          res.status(200)
          res.json(client)
        }
        else {//No document was found
          res.status(404)
          res.json({ message: 'Client not found' })
        }
        return next()
      })
    } catch (error) {
      res.status(400)
      res.json({ message: error })
    }
  })
  
  //CLIENT by id
  router.get('/cliente/id/:client_id', jsonParser, (req, res, next) => {
    try {
      Cliente.findById(req.params.client_id).then(client => {//search client by id in mongodb
        if (client) {//If not null, found a document to return
          res.status(200)
          res.json(client)
        }
        else {//No document was found
          res.status(404)
          res.json({ message: 'Client not found' })
        }
        return next()
      })
    } catch (error) {
      res.status(400)
      res.json({ message: error })
    }
  })
  
  //UPDATE
  router.patch('/cliente/:name_id', jsonParser, async (req, res, next) => {
    try {
      let id = req.params.name_id;
      let result = await Cliente.findByIdAndUpdate(id, req.body).lean(); //Searching by ID and updating with the http request body
      if (result != null) { //If not null, found and updated a document
        let client = await Cliente.findById(id); //Searching the updated document
        res.status(200)
        res.json({ message: "Updated" })
      } else {//Otherwise, no document was found
        res.status(404)
        res.json({ message: 'Not Found' })
      }
    } catch (error) {
      res.status(400)
      res.json({ message: error.message })
    }
  })
  
  //DELETE
  router.delete('/cliente', jsonParser, async (req, res, next) => {
    try {
      let id = req.body.id;
      let result = await Cliente.findByIdAndDelete(id);//Searching by ID and deleting it
      if (result != null) { //If not null, found and deleted a document
        res.status(200)
        res.json({ message: "Deleted" })
      } else {//Otherwise, no document was found
        res.status(404)
        res.json({ result: 'Not Found' })
      }
    } catch (error) {
      res.status(400)
      res.json({ message: error.message })
    }
  })

  module.exports = router;