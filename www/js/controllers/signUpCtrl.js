angular.module('starter')
//-------- signupController & signUpService handles the account creation -----------

  .controller('signUpCtrl', function($scope, signUpService){
    $scope.createUser = function(email,newPassword) {
      signUpService.createUser(email,newPassword);
    }
  })
