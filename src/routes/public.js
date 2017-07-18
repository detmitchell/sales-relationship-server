var express = require('express'),
    Neo4j      = require('../util/neo4j.util');

var app = module.exports = express.Router();
var db = new Neo4j({
  username: 'neo4j',
  password: 'password'
}) ;

app.get('/', function(req,res){
    res.send('Server running');
});

app.post('/api/list/entities', function(req,res){
  db.getRecords(req.body.query, function(err, response){
    if(err) res.status(500).send(err);
    res.status(200).send(response);
  });
});

app.post('/api/put/entity', function(req,res){
  db.putRecord(req.body.entity, function(err,response){
    if(err) res.status(500).send(err);
    res.status(200).send(response);
  });
});