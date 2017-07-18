var expect        = require('chai').expect,
    queryBuilder  = require('../src/util/query.util');

const testObj = {
  name: 'Jim Drewes',
  industry: 'High Tech',
  role: 'SA&E Lead',
  company: 'Daugherty',
  relationships: [
    {
      src: "Jeff Fischer",
      type: "WORKS_FOR",
      strength: "weak"
    }
  ]
}

describe('build query', function(){
  it('should build a query given input object',function(){
    let res = queryBuilder.insertNewRecord(testObj);
    expect(res).to.be.a('string');
    console.log(res);
  })
})