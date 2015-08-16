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
    'ngTouch',
    'chart.js'
  ])
  .config(["$routeProvider", function ($routeProvider) {
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
      .when('/results', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl',
        controllerAs: 'results'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('MainCtrl', ["$scope", "$log", "sessionService", function ($scope, $log, sessionService) {
    $scope.sessionCode = sessionService.code
    $scope.email = 'example@email.com'

    $scope.$watch('sessionCode', function(){
      sessionService.code = $scope.sessionCode;
    })

    $scope.update = function(sessionInput, emailInput) {
      $scope.sessionCode = sessionInput;
      sessionService.code = sessionInput;
      $scope.email = emailInput;
      $log.log("Session Code: ", $scope.sessionCode, "Service Code: ", sessionService.code, "Email: ", $scope.email);
    }
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);


'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('SessionCtrl', ["$scope", "$location", "$resource", "$log", "sessionService", function ($scope, $location, $resource, $log, sessionService) {
    $scope.sessionCode = sessionService.code

    sessionService.Lecture.get().$promise.then(function(response){
      $scope.question = response.poll.question
      $scope.answers = response.poll.answers
      sessionService.question = response.poll.question
      sessionService.answers = response.poll.answers
    })

    $scope.clickin = function(selection) {
      $log.log("selected answer: ", selection)
      sessionService.lecture = sessionService.Lecture.pupdate(selection).$promise.then(function(response){
        sessionService.question = response.poll.question;
        sessionService.answers = response.poll.answers;
      })
    }
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

'use strict';

/**
 * @ngdoc service
 * @name clickInFrontEndApp.sessionService
 * @description
 * # sessionService
 * Service in the clickInFrontEndApp.
 */
angular.module('clickInFrontEndApp')
  .service('sessionService', ["$resource", function ($resource) {
    this.code = "BARK";

    this.Lecture = $resource('http://clickin-backend.herokuapp.com/api/sessions/:session_code',
      {session_code: this.code},
      {
        pupdate:{method: 'PATCH'}
      }
    )
    this.question = {};
    this.answers = [];

  }]);

'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('ResultsCtrl', ["$scope", "$resource", "$log", "sessionService", function ($scope, $resource, $log, sessionService) {
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
  }]);

angular.module('clickInFrontEndApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"container\"> <h2>Welcome</h2> <div class=\"form-group\"> <h4>Enter a Session Code</h4> <input type=\"text\" ng-model=\"sessionCode\" class=\"form-control\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\"><br> <a href=\"#/session\" class=\"btn btn-primary\" ng-touch=\"update(sessionCode, email)\" ng-click=\"update(sessionCode, email)\">Submit</a> </div> </div>"
  );


  $templateCache.put('views/results.html',
    "<h3>{{question.content}}</h3> <h4>Click-Ins: {{question.count}}</h4> <h3>Results</h3> <canvas id=\"pie\" class=\"chart chart-pie\" data=\"data\" labels=\"labels\" legend=\"legend\"></canvas>"
  );


  $templateCache.put('views/session.html',
    "<h3>Question: {{question.content}}</h3> <div class=\"row\"> <div ng-repeat=\"answer in answers\" class=\"col-xs-6\"> <a href=\"#/results\" class=\"btn btn-lg\" ng-touch=\"clickin(answer)\" ng-click=\"clickin(answer)\">{{answer.content}}</a> </div> </div>"
  );

}]);
