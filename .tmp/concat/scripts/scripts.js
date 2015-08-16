'use strict';

/**
 * @ngdoc overview
 * @name clickInFrontEndApp
 * @description
 * # clickInFrontEndApp
 *
 * Main module of the application.
 */
 debugger
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
    this.code = "WOOF";
  });

angular.module('clickInFrontEndApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"container\"> <h2>Welcome</h2> <div class=\"form-group\"> <h4>Enter a Session Code</h4> <input type=\"text\" ng-model=\"sessionCode\" class=\"form-control\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\"><br> <a href=\"#/session\" class=\"btn btn-primary\" ng-click=\"update(sessionCode, email)\">Submit</a> </div> </div>"
  );


  $templateCache.put('views/session.html',
    "<p>This is the session view.</p> <h3>Code: {{sessionCode}}</h3> <h3>Session: {{sessionResult.code}}</h3>"
  );

}]);
