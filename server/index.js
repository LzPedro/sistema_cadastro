const express = require('express');
const mongoose = require('mongoose');
const routes_city = require("./routes/Cidade");
const routes_client = require("./routes/Cliente");
const app = express();

app.use("/cidade", routes_city);
app.use("/cliente", routes_client);
app.use(express.urlencoded({ extended: false }));
const port = 3000;


mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify',false);
// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));



app.listen(port, () => console.log(`Server running at port ${port}`));