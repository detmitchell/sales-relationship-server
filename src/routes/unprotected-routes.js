var express = require('express'),
    jwt     = require('express-jwt'),
    async   = require('async'),
    relationships = require('../assets/relationships.json'),
    creds = require('../assets/credentials.json');


var AWS = require('aws-sdk');
AWS.config.update(creds);

var docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "entities",
  ProjectionExpression: "id, attributes, relationships"
}

var app = module.exports = express.Router();

app.get('/api/relationships', function(req,res){
  res.status(200).send(relationships);
});

app.get('/api/scanData', function(req,res){
  docClient.scan(params, function(err, response){
    if(err){
      console.log(err);
    }
    res.send(response);
  });
});