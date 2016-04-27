var models = require('../models');
var services = require('../services');

exports.insertUserPost = function(req, res){

  var name = req.body.name;

  res.send(req.body);

}
