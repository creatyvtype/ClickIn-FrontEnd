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
