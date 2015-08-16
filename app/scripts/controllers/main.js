'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('MainCtrl', function ($scope, $log) {
    $scope.session = 'DBC-Hack'
    $scope.email = 'example@email.com'
    $scope.update = function(sessionInput, emailInput) {
      $scope.session = sessionInput;
      $scope.email = emailInput;
      $log.log($scope.session, $scope.email);
    }
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
