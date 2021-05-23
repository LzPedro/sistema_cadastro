
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CidadeSchema = new Schema({
  Nome: {
    type: String,
    required: true
  },
  Estado: {
    type: String,
    required: true
  }
});

module.exports = Cidade = mongoose.model('cidade', CidadeSchema);