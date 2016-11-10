angular.module('starter')
  .controller('loginCtrl', function($scope, $state, $auth, $http) {
  $scope.email = 'user@email.com';
  $scope.password='password'
      // $scope.login = function(email, password) {
      //   $scope.user = {
      //     email: email,
      //     password: password
      //   }
      //
      //   $auth.login($scope.user)
      //     .then(function(response) {
      //       $auth.setToken(response.data.token);
      //       $state.go('tabs.home');
      //     })
      //     .catch(function(error){
      //       $scope.error = error.data.message
      //
      //     })
      // }
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
          $scope.user = res.data.user;
          $state.go('tabs.home');
          console.log('user ' + $scope.user);
      })
        .catch(function(error){
          $scope.error = error.data.message

        })
  }

  })
