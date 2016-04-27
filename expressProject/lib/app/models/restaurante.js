"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String},
    telefone: {type: String},
    endereco: {type: String},
    especialidade: {type: String},
    site: {type: String},
    email: {type: String}
});

  //{collection: 'bareserestaurantes'}

module.exports = mongoose.model('Restaurante', schema);
