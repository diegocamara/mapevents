var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String},
    descricao: {type: String},
    bairro: {type: String},
    logradouro: {type: String},
    telefone: {type: String},
    site: {type: String},
    funcionamento: {type: String},
    funcionamentoDomingo: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
}, {collection: 'centrosdecompras'});

module.exports = mongoose.model('CentroDeCompra', schema);
