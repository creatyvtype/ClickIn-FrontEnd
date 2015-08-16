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
    'ngTouch'
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
  .controller('SessionCtrl', ["$scope", "$http", "$resource", "$routeParams", "$log", "sessionService", function ($scope, $http, $resource, $routeParams, $log, sessionService) {
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
  .service('sessionService', function () {
    this.code = "BARK";
  });

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
  }]);

angular.module('clickInFrontEndApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"container\"> <h2>Welcome</h2> <div class=\"form-group\"> <h4>Enter a Session Code</h4> <input type=\"text\" ng-model=\"sessionCode\" class=\"form-control\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\"><br> <a href=\"#/session\" class=\"btn btn-primary\" ng-click=\"update(sessionCode, email)\">Submit</a> </div> </div>"
  );


  $templateCache.put('views/results.html',
    "<h3>Question: {{lecture.poll.question.content}}</h3> <h4>Total Click-Ins: {{lecture.poll.question.count}}</h4> <h3>Results</h3> <div ng-repeat=\"answer in lecture.poll.answers\"> <h4>{{answer.content}}</h4> <h4>Count: {{answer.count}}</h4> </div>"
  );


  $templateCache.put('views/session.html',
    "<h3>Question: {{lecture.poll.question.content}}</h3> <div class=\"row\"> <div ng-repeat=\"answer in lecture.poll.answers\" class=\"col-xs-6\"> <a href=\"#/results\" class=\"btn btn-lg\" ng-click=\"\">{{answer.content}}</a> </div> </div>"
  );

}]);
