angular.module('clickInFrontEndApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"container\"> <h2>Welcome</h2> <div class=\"form-group\"> <h4>Enter a Session Code</h4> <input type=\"text\" ng-model=\"session\" class=\"form-control\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\"><br> <input type=\"submit\" ng-click=\"update(session, email)\"> </div> </div>"
  );

}]);
