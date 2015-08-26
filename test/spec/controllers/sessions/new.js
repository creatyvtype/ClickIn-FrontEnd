'use strict';

describe('Controller: SessionsNewCtrl', function () {

  // load the controller's module
  beforeEach(module('clickInFrontEndApp'));

  var SessionsNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SessionsNewCtrl = $controller('SessionsNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SessionsNewCtrl.awesomeThings.length).toBe(3);
  });
});
