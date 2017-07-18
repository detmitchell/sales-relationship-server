module.exports.insertNewRecord = function(record){
  query = "MATCH (n) WHERE n.name='"+record.relationships[0].src+"' "+
          "CREATE (m:"+record.company+" "+
          "{name:'"+record.name+"',industry:'"+record.industry+"',role:'"+record.role+"'})"+
          "<-[:"+record.relationships[0].type+"]-(n)";
  return query;
};