angular.module('starter')
  .service('signUpService', function($http){
    this.createUser = function(email, newPassword) {
       return $http({
        method:'POST',
        url: 'http://localhost:3000/signUp',
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('myToken')
        },
        data: {
          email: email,
          password: newPassword
        }
      })
    }
  })
