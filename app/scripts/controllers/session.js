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
