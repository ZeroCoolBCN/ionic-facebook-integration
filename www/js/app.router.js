// Routes config
(function() {
  'use strict';

  angular
    .module('ionicFacebookIntergration.routes', [])
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        // Login routes
        .state('login', {
          url: '/login',
          templateUrl: './templates/login.html',
          controller: 'LoginCtrl'
        })

        // Login routes
        .state('albums', {
          url: '/albums',
          templateUrl: './templates/home.html',
          controller: 'AlbumsCtrl'
        })

        .state('photos',{
          url: '/albums/:id',
          templateUrl: './templates/photos.html',
          controller: 'PhotosCtrl'
        })

      $urlRouterProvider.otherwise('/albums');
    }

})();
