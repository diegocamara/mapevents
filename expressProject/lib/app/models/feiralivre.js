var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String},
    localizacao: {type: String},
    dias: {type: String},
    horario: {type: String},
    observacao: {type: String},
    latitude: {type: Number},
    longitude: {type: Number}
}, {collection: 'feiraslivres'});

module.exports = mongoose.model('FeiraLivre', schema);
