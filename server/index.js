const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes");
const app = express();

app.use("/api", routes);
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