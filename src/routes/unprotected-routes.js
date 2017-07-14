var express = require('express'),
    jwt     = require('express-jwt'),
    async   = require('async'),
    relationships = require('../assets/relationships.json');

var app = module.exports = express.Router();

app.get('/api/relationships', function(req,res){
  res.status(200).send(relationships);
});