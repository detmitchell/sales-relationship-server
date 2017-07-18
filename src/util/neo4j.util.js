var neo4j   = require('neo4j-driver').v1;

const AllEntitiesQuery  = 'MATCH (n) RETURN n UNION ALL MATCH ()-[n]->() RETURN n';

function Neo4j(creds){
  let driver = neo4j.driver('bolt://localhost:', 
      neo4j.auth.basic(creds.username,creds.password));
  this._session = driver.session();
}

Neo4j.prototype.getRecords = function(query, cb){
  this._session
    .run(query || AllEntitiesQuery)
    .then(function(data){
      return cb(null,formatResponse(data.records));
    })
    .catch(function(err){
      return cb(err);
    });
}

function formatResponse(records) {
  let elements = [];
  for(let record of records){
    let field = record._fields[0];
    if(field.labels){
      elements.push(formatEntityRecord(field));
    } else {
      elements.push(formatRelationshipRecord(field))
    }
  }
  return elements;
}

function formatEntityRecord(record) {
  return {
    data: {
      id: String(record.identity.low),
      name: record.properties.name,
      industry: record.properties.industry,
      role: record.properties.role,
      company: record.labels[0]
    }
  };
}

function formatRelationshipRecord(record){
  return {
    data: {
      id: String(record.start.low) + 'x' + String(record.end.low),
      source: String(record.start.low),
      target: String(record.end.low),
      rel: record.type,
      strength: record.properties.strength
    }
  };
}

module.exports = Neo4j;