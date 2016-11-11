angular.module('starter')
//-------- signupController & signUpService handles the account creation -----------

  .controller('signUpCtrl', function($scope, signUpService, $ionicHistory, $state){
    $scope.createUser = function(email,newPassword) {
      signUpService.createUser(email,newPassword).then(function(response){
        console.log('the response ' + response);
      }).catch(function(error){
        $scope.error = error.data.message;
      });

    }

    $scope.myGoBack = function(){
      $state.go('login');
    }
  })
