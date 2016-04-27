"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String},
    descricao: {type: String}
});

module.exports = mongoose.model('Categoria', schema);
