'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('SessionCtrl', function ($scope, $http, $resource, $routeParams, $log, sessionService) {
    $scope.sessionCode = sessionService.code
    $log.log("code: ", sessionService.code)
    $scope.sessionCall = $resource('http://clickin-backend.herokuapp.com/api/sessions/:session_code',
      {session_code: sessionService.code}
    )
    $scope.sessionResult = $scope.sessionCall.get()
    $log.log("response: ",$scope.sessionResult)
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
