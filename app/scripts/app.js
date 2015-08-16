'use strict';

/**
 * @ngdoc overview
 * @name clickInFrontEndApp
 * @description
 * # clickInFrontEndApp
 *
 * Main module of the application.
 */
angular
  .module('clickInFrontEndApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/session', {
        templateUrl: 'views/session.html',
        controller: 'SessionCtrl',
        controllerAs: 'session'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
