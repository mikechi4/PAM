angular.module('starter')
//-------- signupController & signUpService handles the account creation -----------

  .controller('signUpCtrl', function($scope, signUpService, $ionicHistory, $state){
    $scope.createUser = function(email,newPassword) {
      signUpService.createUser(email,newPassword);
    }

    $scope.myGoBack = function(){
      $state.go('login');
    }
  })
