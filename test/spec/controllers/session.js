'use strict';

describe('Controller: SessionCtrl', function () {

  // load the controller's module
  beforeEach(module('clickInFrontEndApp'));

  var SessionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SessionCtrl = $controller('SessionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SessionCtrl.awesomeThings.length).toBe(3);
  });
});
