angular.module('starter')
  .controller('loginCtrl', function($scope, $state, $auth, $http) {
  // $scope.email = 'user@email.com';
  // $scope.password='password'
  $scope.login = function(email, password) {
    console.log('logging in')
      $http({
          method: 'POST',
          url: 'http://localhost:3000/auth/login',
          data: {
              email: email,
              password: password
          }
      })
      .then(function(res) {
          sessionStorage.setItem('myToken', res.data.token);
          $scope.data = res.data;
          console.log(res.data);
          $state.go('tabs.home',{id:$scope.data.id});
          console.log('user ' + $scope.data.user);
          console.log('user id at login ' + $scope.data.id);
      })
        .catch(function(error){
          $scope.error = error.data.message
      })
  }
})
