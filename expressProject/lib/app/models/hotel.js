var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String},
    endereco: {type: String},
    telefone: {type: String},
    site: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
},{collection: 'hoteis'});

module.exports = mongoose.model('Hotel', schema);
