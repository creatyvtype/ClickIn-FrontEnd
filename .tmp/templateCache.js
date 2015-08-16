angular.module('clickInFrontEndApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"container\"> <h2>Welcome</h2> <div class=\"form-group\"> <h4>Enter a Session Code</h4> <input type=\"text\" ng-model=\"sessionCode\" class=\"form-control\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\"><br> <a href=\"#/session\" class=\"btn btn-primary\" ng-click=\"update(sessionCode, email)\">Submit</a> </div> </div>"
  );


  $templateCache.put('views/results.html',
    "<h3>Question: {{question.content}}</h3> <h4>Total Click-Ins: {{question.count}}</h4> <h3>Results</h3> <div ng-repeat=\"answer in answers\"> <h4>{{answer.content}}</h4> <h4>Count: {{answer.count}}</h4> </div>"
  );


  $templateCache.put('views/session.html',
    "<h3>Question: {{question.content}}</h3> <div class=\"row\"> <div ng-repeat=\"answer in answers\" class=\"col-xs-6\"> <a href=\"#/results\" class=\"btn btn-lg\" ng-click=\"clickin(answer)\">{{answer.content}}</a> </div> </div>"
  );

}]);
