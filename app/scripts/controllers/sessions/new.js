'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:SessionsNewCtrl
 * @description
 * # SessionsNewCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('SessionsNewCtrl', function ($scope, $http, $location) {

    $scope.code = ""
    $scope.question = ""
    $scope.choices = [{id: '1', content: "", count: 0}];
    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id': newItemNo, content: "", count: 0});
    };
    $scope.showAddChoice = function(choice) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };

    $scope.postSession = function() {
      var params = {
        "code": $scope.code,
        "ended": false,
        "poll": {
          "question": {"content": $scope.question, "count": 0},
          "answers": $scope.choices
        }
      }

      $http.post('http://clickin-backend.herokuapp.com/api/sessions', params)
        .then(function(response) {
          console.log("Success!")
          console.log(response)
          $location.path('/')
        }, function(response){
          console.log("Fail!")
          console.log(response)
        });

    }

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
