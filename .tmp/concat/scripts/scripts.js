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
  .controller('MainCtrl', ["$scope", "$log", function ($scope, $log) {
    $scope.session = 'DBC-Hack'
    $scope.email = 'example@email.com'
    $scope.update = function(sessionInput, emailInput) {
      $scope.session = sessionInput;
      $scope.email = emailInput;
      $log.log($scope.session, $scope.email);
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
    "<div class=\"container\"> <h2>Welcome</h2> <div class=\"form-group\"> <h4>Enter a Session Code</h4> <input type=\"text\" ng-model=\"session\" class=\"form-control\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\"><br> <input type=\"submit\" ng-click=\"update(session, email)\"> </div> </div>"
  );

}]);
