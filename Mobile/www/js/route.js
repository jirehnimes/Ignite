angular.module('ignite.routes', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('index', {
      url: '/',
      templateUrl: 'view/index.html',
      controller: 'IndexCtrl'
    })



    .state('register', {
      url: '/register',
      templateUrl: 'view/register.html',
      controller: 'RegisterCtrl'
    })



    .state('menu', {
      url: '/',
      templateUrl: 'view/menu.html',
      controller: 'MenuCtrl'
    })



    .state('menu.home', {
      url: 'home',
      views: {
        'menuContent': {
          templateUrl: 'view/home.html',
          controller: 'HomeCtrl'
        }
      }
    })



    .state('menu.find', {
      url: 'find',
      views: {
        'menuContent': {
          templateUrl: 'view/find.html',
          controller: 'FindCtrl'
        }
      }
    })



  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
