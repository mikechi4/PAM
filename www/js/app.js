  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('starter', ['ionic'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    })
  })

  //route handler
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        })

        .state('signUp', {
          url: '/signup',
          // abstract: true,
          templateUrl: 'templates/signup.html',
          controller:'signUpCtrl'
        })

        .state('tabs', {
          url: '/tab',
          abstract: true,
          templateUrl:'templates/tabs.html'
        })

        .state('tabs.home', {
          url: '/home',
          views: {
            'home-tab': {
              templateUrl: 'templates/home.html',
              controller: 'homeCtrl'
            }
          }
        })

        .state('transactions', {
          url:'/transactions',
          templateUrl: 'templates/transactions.html',
          controller: 'transactionsCtrl'
        })

        .state('edit', {
          url:'/edit/?id=',
          templateUrl: 'templates/edit.html',
          controller: 'editCtrl'
        })

      $urlRouterProvider.otherwise('/login');
    })

    //-------- signupController & signUpService handles the account creation -----------

    .controller('signUpCtrl', function($scope, signUpService){
      $scope.createUser = function(email,newPassword) {
        signUpService.createUser(email,newPassword);
      }
    })

    .service('signUpService', function($http){
      this.createUser = function(email, newPassword) {
         $http({
          method:'POST',
          url: 'http://localhost:3000/signUp',
          data: {
            email: email,
            password: newPassword
          }
        })
      }
    })

//-------- loginController & loginService handles the account creation -----------

.controller('loginCtrl', function($scope, loginService){
  $scope.checkUser = function(username, password) {
    loginService.checkUser(username, password).then(function(response){
      $scope.data = response.user_id;
    });
  }
})

.service('loginService', function($http, $q){
  this.checkUser = function(username, password) {
    var deferred = $q.defer();
     $http({
      method: 'GET',
      url: 'http://localhost:3000/login'
    }).then(function(response){

      deferred.resolve(response)
    })
    return deferred.promise;
  }
})

//-------- homeController & homeService handles retrieval of transactions-----------
  .controller('homeCtrl', function($scope, homeService){


    $scope.getTransactions = function() {
      $scope.spendTotal = 0;
      //getTransactions promise handles data from db transactions and
      //handles sum of all transactions to display on home page
      homeService.getTransactions().then(function(response) {
        $scope.transactions = response.data;
          //get total of all transactions posted
          for(var i = 0; i < $scope.transactions.length; i++) {
            $scope.spendTotal += ($scope.transactions[i].amount * 1);
          }
        $scope.spendTotal = $scope.spendTotal.toFixed(2);
        return $scope.spendTotal;


      })
    }
    $scope.getTransactions();
  })

  .service('homeService', function($http){
    this.getTransactions = function(){
      return $http({
        method: 'GET',
        url:'http://localhost:3000/home'
      });
    }
  })

//-------- transactionsCtrl handles addition of new transactions -----------
  .controller('transactionsCtrl', function($scope, transactionsService){
    $scope.addTransaction = function(name, amountSpent, purchaseDate, category){
      transactionsService.addTransaction(name, amountSpent, purchaseDate, category);
    }
  })

  .service('transactionsService', function($http){
    this.addTransaction = function(name, amountSpent, purchaseDate, category) {
       $http({
        method:'POST',
        url: 'http://localhost:3000/transactions',
        data: {
          amount: amountSpent,
          category: category,
          purchase_date: purchaseDate,
          user_id: 21,
          name: name
        }
      })
    }
  })

  //-------- editCtrl handles addition of modification/deletion of existing transactions -----------
  .controller('editCtrl', function($scope, editService, $stateParams){
    var id = $stateParams.id;

    $scope.category="";
    $scope.categories = [
    {
      display: 'Restaurant',
      value: 'Restaurant'
    },
    {
      display: 'Transportation',
      value: 'Transportation'
    },
    {
      display: 'Grocery',
      value: 'Grocery'
    },
    {
      display: 'Travel',
      value: 'Travel'
    },
    {
      display: 'Merchandise',
      value: 'Merchandise'
    },
    {
      display: 'Medical',
      value: 'Medical'
    },
    {
      display: 'Business Service',
      value: 'Business Service'
    },
    {
      display: 'Other',
      value: 'Other'
    }

    ]
    $scope.deleteTransaction = function(id){
      editService.deleteTransaction(id);
    }

    $scope.getThisTransaction = function(id) {
      editService.getThisTransaction(id).then(function(response){
        $scope.data = response.data[0];
        //bind values from service to input values on view
        $scope.name = $scope.data.name;
        $scope.amountSpent = $scope.data.amount;
        $scope.category = $scope.data.category;
        $scope.purchaseDate = $scope.data.purchase_date;
      })
    }
    $scope.getThisTransaction(id);

    $scope.updateTransaction = function(id, name, amountSpent, purchaseDate, category) {
      editService.updateTransaction(id, name, amountSpent, purchaseDate, category);
    }
  })


  .service('editService', function($http) {
    this.getThisTransaction = function(id) {
      return $http({
        method:'GET',
        url:'http://localhost:3000/edit/?id=' + id
      })
    }

    this.deleteTransaction = function(id) {
      $http({
        method:'DELETE',
        url:'http://localhost:3000/edit/?id=' + id
      })
    }

    this.updateTransaction = function(id, name, amountSpent, purchaseDate, category) {
      $http({
        method:'PUT',
        url:'http://localhost:3000/edit',
        data: {
          transaction_id: id,
          amount: amountSpent,
          category: category,
          purchaseDate: purchaseDate,
          name: name
        }
      })
    }
  })
