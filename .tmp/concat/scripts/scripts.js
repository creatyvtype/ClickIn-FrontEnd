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
      .when('/sessions/new', {
        templateUrl: 'views/sessions/new.html',
        controller: 'SessionsNewCtrl',
        controllerAs: 'sessions/new'
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
    if (sessionService.code.length === 0 ) {$location.path('/');}
    $scope.sessionCode = sessionService.code

    var getSession = $resource('http://clickin-backend.herokuapp.com/api/sessions/:session_code',
      {session_code: sessionService.code},
      {
        pupdate:{method: 'PATCH'}
      }
    )

    getSession.get().$promise.then(function(response){
      if (response.poll === undefined) {$location.path('/');}
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
  .controller('ResultsCtrl', ["$scope", "$resource", "$log", "$location", "sessionService", function ($scope, $resource, $log, $location,sessionService) {
    if (sessionService.code.length === 0 ) {$location.path('/');}
    $scope.sessionCode = sessionService.code
    $log.log("SESSION LECTURE: ", sessionService.answers)
    $scope.question = sessionService.question
    $scope.answers = sessionService.answers

    var setChart = function(question, answers) {
      $scope.legend = true;
      $scope.labels = [];
      $scope.data = [];
      // $scope.colors = ['red']
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

'use strict';

/**
 * @ngdoc function
 * @name clickInFrontEndApp.controller:SessionsNewCtrl
 * @description
 * # SessionsNewCtrl
 * Controller of the clickInFrontEndApp
 */
angular.module('clickInFrontEndApp')
  .controller('SessionsNewCtrl', ["$scope", "$http", "$location", function ($scope, $http, $location) {

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
  }]);

angular.module('clickInFrontEndApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"container\"> <div class=\"form-group\"> <a href=\"/#/sessions/new\">Create a Survey</a> <div><h4>Enter a Code</h4></div> <input type=\"text\" ng-model=\"sessionCode\" class=\"form-control\" placeholder=\"Session Name\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\" placeholder=\"Email\"><br> <div class=\"center-btn\"> <div class=\"btn btn-primary\" ng-click=\"update(sessionCode, email)\">Click In!</div> </div> </div> </div>"
  );


  $templateCache.put('views/results.html',
    "<a href=\"/#/\">Home</a> <div class=\"text-center\"><h3>{{question.content}}</h3></div> <div class=\"text-center\"><h4>Click-Ins: {{question.count}}</h4></div> <div class=\"text-center\"><h3>Results</h3></div> <canvas id=\"pie\" class=\"chart chart-pie\" data=\"data\" labels=\"labels\" legend=\"legend\"> </canvas>"
  );


  $templateCache.put('views/session.html',
    "<div class=\"text-center\"><h3>{{question.content}}</h3></div> <div class=\"row\"> <div class=\"col s12\"> <div ng-repeat=\"answer in answers\" class=\"answer-wrapper\"> <div class=\"btn btn-lg answer-button\" ng-click=\"clickin(answer)\">{{answer.content}}</div> </div> </div> </div>"
  );


  $templateCache.put('views/sessions/new.html',
    "<a href=\"/#/\">Home</a> <h5>Create your Survey here</h5> <form> <div class=\"form-group\"> <label>Code</label> <input type=\"text\" ng-model=\"code\" placeholder=\"Enter a custom code\"> </div> <div class=\"form-group\"> <label>Question</label> <input type=\"text\" ng-model=\"question\" placeholder=\"Enter a question\"> </div> <label>Choices</label> <div class=\"form-group\" data-ng-repeat=\"choice in choices track by choice.id\"> <input type=\"text\" ng-model=\"choice.content\" name=\"\" placeholder=\"Enter a choice\"> <button ng-show=\"showAddChoice(choice)\" ng-click=\"addNewChoice()\">Add another choice</button> </div> <button ng-click=\"postSession()\">Submit</button> </form>"
  );

}]);
