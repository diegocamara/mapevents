var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  categoria: {type: Number},
  severidade: {type: Number},
  comentarios: {type: String},
  loc:{
    type: {type: String, default: 'Point'},
    coordinates: []
  },
  data: {type: Date, default: Date.now},
  facebookid: {type: String}
});

module.exports = mongoose.model('Alerta', schema);
