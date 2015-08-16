'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('SessionCtrl', function ($scope, $location, $resource, $log, sessionService) {
    $scope.sessionCode = sessionService.code

    var getSession = $resource('http://clickin-backend.herokuapp.com/api/sessions/:session_code',
      {session_code: sessionService.code},
      {
        pupdate:{method: 'PATCH'}
      }
    )

    getSession.get().$promise.then(function(response){
      $scope.question = response.poll.question
      $scope.answers = response.poll.answers
      sessionService.question = response.poll.question
      sessionService.answers = response.poll.answers
    })

    $scope.clickin = function(selection) {
      $log.log("selected answer: ", selection)
      sessionService.lecture = getSession.pupdate(selection).$promise.then(function(response){
        sessionService.question = response.poll.question;
        sessionService.answers = response.poll.answers;
      })
      $location.path('/results')
    }
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
