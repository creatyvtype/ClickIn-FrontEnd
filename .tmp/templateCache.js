angular.module('clickInFrontEndApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"container\"> <h2>Welcome</h2> <div class=\"form-group\"> <h4>Enter a Session Code</h4> <input type=\"text\" ng-model=\"sessionCode\" class=\"form-control\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\"><br> <a href=\"#/session\" class=\"btn btn-primary\" ng-click=\"update(sessionCode, email)\">Submit</a> </div> </div>"
  );


  $templateCache.put('views/session.html',
    "<p>This is the session view.</p> <h3>Code: {{sessionCode}}</h3> <h3>Session: {{sessionResult.code}}</h3>"
  );

}]);
