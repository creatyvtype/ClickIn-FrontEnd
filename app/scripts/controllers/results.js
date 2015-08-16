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

    // $scope.$watch(function(scope){return scope.answers},
    //   function(newValue, oldValue) {
    //     $scope.answers = newValue
    //     newValue.forEach(function(answer))
    //   }
    // )

    var setChart = function(question, answers) {
      $scope.legend = true;
      $scope.labels = [];
      $scope.data = [];
      $scope.answers = answers;
      $scope.question = question;
      answers.forEach(function(answer) {
        $scope.labels.push(answer.content)
        $scope.data.push(answer.count)
      })
    }

    setChart($scope.question, $scope.answers)

    var socket = io("http://clickin-backend.herokuapp.com")
    socket.on('result', function(data){
      console.log("RECEIVED: ",data);
      $log.log(data.poll.answers)
      setChart(data.poll.question, data.poll.answers)
      $scope.$apply();
    })

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
