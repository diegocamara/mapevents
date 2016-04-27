var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String},
    descricao: {type: String},
    bairro: {type: String},
    logradouro: {type: String},
    telefone: {type: String},
    site: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
}, {collection: 'museus'});

module.exports = mongoose.model('Museu', schema);
