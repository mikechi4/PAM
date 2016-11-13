  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('starter', ['ionic', 'satellizer', 'nvd3' ])

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
          // resolve: {
          //   skipIfLoggedIn: skipIfLoggedIn
          // }
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
          url: '/home/:id',
          params:{
            id:null
          },
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

        .state('tabs.settings', {
          url: '/settings',
          views: {
            'settings-tab': {
              templateUrl: 'templates/settings.html',
              controller: 'settingsCtrl'
            }
          }
        })

        .state('tabs.history', {
          url: '/history',
          views: {
            'history-tab': {
              templateUrl: 'templates/history.html'
            }
          }
        })
      $urlRouterProvider.otherwise('/login');
    })
