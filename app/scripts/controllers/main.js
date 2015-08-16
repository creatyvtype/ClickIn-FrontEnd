'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('MainCtrl', function ($scope, $log, $location, sessionService) {
    $scope.sessionCode = sessionService.code
    $scope.email = ''

    $scope.$watch('sessionCode', function(){
      sessionService.code = $scope.sessionCode;
    })

    $scope.update = function(sessionInput, emailInput) {
      $scope.sessionCode = sessionInput;
      sessionService.code = sessionInput;
      $scope.email = emailInput;
      $log.log("Session Code: ", $scope.sessionCode, "Service Code: ", sessionService.code, "Email: ", $scope.email);
      $location.path('/session')
    }
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

