angular.module('clickInFrontEndApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"container\"> <div class=\"form-group\"> <h4>Enter a Code</h4> <input type=\"text\" ng-model=\"sessionCode\" class=\"form-control\" placeholder=\"Session Name\"> <h4>Email</h4> <input type=\"text\" ng-model=\"email\" class=\"form-control\" placeholder=\"Email\"><br> <div class=\"center-btn\"> <a href=\"#/session\" class=\"btn btn-primary\" ng-click=\"update(sessionCode, email)\">Start Session</a> </div> </div> </div>"
  );


  $templateCache.put('views/results.html',
    "<h3>{{question.content}}</h3> <h4>Click-Ins: {{question.count}}</h4> <h3>Results</h3> <canvas id=\"pie\" class=\"chart chart-pie\" data=\"data\" labels=\"labels\" legend=\"legend\"> </canvas>"
  );


  $templateCache.put('views/session.html',
    "<h3>{{question.content}}</h3> <div class=\"row\"> <div class=\"col s12\"> <div ng-repeat=\"answer in answers\" class=\"answer-wrapper\"> <a href=\"#/results\" class=\"btn btn-lg answer-button\" ng-click=\"clickin(answer)\" ng-touch=\"clickin(answer)\">{{answer.content}}</a> </div> </div> </div>"
  );

}]);
