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
    $log.log("SESSION LECTURE: ", sessionService.answers)
    $scope.question = sessionService.question
    $scope.answers = sessionService.answers

    var socket = io("http://clickin-backend.herokuapp.com")
    socket.on('news', function(data){
      console.log("RECEIVED: ",data);

    })

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
