var chai = require('chai');
var chatHttp = require('chai-http');
var editCtrl = require('../controllers/editCtrl');
var angular = require('angular')
var server = require('../server/server');

chai.use(chaiHttp);
  describe('editCtrl', function(){
    describe('test', function(){
      it('should exist', function(){
        chai.expect(editCtrl.test).isFunction();
      })
    })
  })
