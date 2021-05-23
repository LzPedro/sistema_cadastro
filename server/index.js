const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Item = require('./models/Item');
const Cidade = require('./models/Cidade');
const Cliente = require('./models/Cliente');

const jsonParser = bodyParser.json()

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
02
  newItem.save().then(item => res.redirect('/'));
});


//CREATE cidade
app.post('/cidade', jsonParser, (req, res, next) => {
  let city = new Cidade(req.body)//create a city from the http request body
  console.log("CREATE cidade")
  city.save();//save in the mongo DB
  res.json(city)
})

//CREATE cliente
app.post('/cliente', jsonParser, (req, res, next) => {
  let client = new Cliente(req.body)//create a client from the http request body
  console.log("CREATE cliente")
  client.save();//save in the mongo DB
  res.json(client)
})

//CITY by name
app.get('/cidade/name/:city_name', jsonParser, (req, res, next) => {
  console.log("READ ONE")
  Cidade.find({ Nome: req.params.city_name }).then(cities => {
    console.log(cities.length === 0)
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
})

//CITY by state
app.get('/cidade/estado/:city_state', jsonParser, (req, res, next) => {
  console.log("READ ONE")
  Cidade.find({ Estado: req.params.city_state }).then(cities => {
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
})

//CLIENT by name
app.get('/cliente/name/:client_name', jsonParser, (req, res, next) => {
  console.log("READ ONE")
  Cliente.find({ nome_completo: req.params.client_name }).then(client => {
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
})

//CLIENT by id
app.get('/cliente/id/:client_id', jsonParser, (req, res, next) => {
  Cliente.findById(req.params.client_id).then(client => {
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
})

//UPDATE
app.patch('/cliente/:name_id', jsonParser, async (req, res, next) => {
  //let the_letter = new Letter(req.body)
  console.log("UPDATE")
  try {
    let id = req.params.name_id; 
    //console.log(req.body)
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
    res.json({ message: error })
  }
})

//DELETE
app.del('/cliente', jsonParser, async (req, res, next) => {
  console.log("DELETE")
  try {
    let id = req.body.id; 
    //console.log(id)
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
    res.json({ message: error })
  }
})






















const port = 3000;

app.listen(port, () => console.log('Server running...'));