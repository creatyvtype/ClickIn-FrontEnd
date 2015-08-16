'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('ResultsCtrl', function ($scope, $resource, $log, sessionService) {
    $scope.sessionCode = sessionService.code
    $scope.sessionCall = $resource('http://clickin-backend.herokuapp.com/api/sessions/:session_code',
      {session_code: sessionService.code}
    )
    $scope.lecture = $scope.sessionCall.get()
    $log.log("response: ",$scope.lecture)
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
