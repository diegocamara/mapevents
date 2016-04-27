var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String},
    descricao: {type: String},
    bairro: {type: String},
    logradouro: {type: String},
    telefone: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
},{collection: 'teatros'});

module.exports = mongoose.model('Teatro', schema);
