angular.module('starter')
  .controller('settingsCtrl', function($scope, $state){
    $scope.logout = function() {
      sessionStorage.removeItem('myToken');
    }

  })
