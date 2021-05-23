
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  nome_completo: {
    type: String,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  data_de_nascimento: {
    type: Date,
    required: true
  },
  idade: {
    type: Number,
    min: 0,
    required: true
  },
  cidade_mora: {
    type: String,
    required: true
  }
});

module.exports = Cliente = mongoose.model('cliente', ClienteSchema);