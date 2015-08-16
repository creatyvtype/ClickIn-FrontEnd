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
  .controller('MainCtrl', ["$scope", "$log", "$location", "sessionService", function ($scope, $log, $location, sessionService) {
    $scope.sessionCode = sessionService.code
    $scope.email = 'example@email.com'

    $scope.$watch('sessionCode', function(){
      sessionService.code = $scope.sessionCode;
      console.log(sessionService.code)
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
    this.code = "";


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
    "<div class=\"container\"> <div class=\"form-group\"> <div class=\"text-center\"><h4>Enter a Code</h4></div> <input type=\"text\" ng-model=\"sessionCode\" class=\"form-control\" placeholder=\"Session Name\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\" placeholder=\"Email\"><br> <div class=\"center-btn\"> <a href=\"#/session\" class=\"btn btn-primary\" ng-click=\"update(sessionCode, email)\">Click In!</a> </div> </div> </div>"
  );


  $templateCache.put('views/results.html',
    "<div class=\"text-center\"><h3>{{question.content}}</h3></div> <div class=\"text-center\"><h4>Click-Ins: {{question.count}}</h4></div> <div class=\"text-center\"><h3>Results</h3></div> <canvas id=\"pie\" class=\"chart chart-pie\" data=\"data\" labels=\"labels\" legend=\"legend\"> </canvas>"
  );


  $templateCache.put('views/session.html',
    "<div class=\"text-center\"><h3>{{question.content}}</h3></div> <div class=\"row\"> <div class=\"col s12\"> <div ng-repeat=\"answer in answers\" class=\"answer-wrapper\"> <a href=\"#/results\" class=\"btn btn-lg answer-button\" ng-click=\"clickin(answer)\" ng-touch=\"clickin(answer)\">{{answer.content}}</a> </div> </div> </div>"
  );

}]);
