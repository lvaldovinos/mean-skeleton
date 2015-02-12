'use strict';

var request = require('supertest'),
    should = require('should'),
    app = require('./../app');
    
describe('MEAN Skeleton test case' , function() {
  describe('#initilize' , function() {
    it('Should create a server and return JSON when GET /' , function(done) {
      request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type' , /json/)
        .end(function(err , res) {
          if (err) return done(err);
          res.body.hello.should.be.exactly('world');
          done();
        });
    });
  });
});