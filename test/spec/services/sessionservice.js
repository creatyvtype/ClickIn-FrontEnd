'use strict';

describe('Service: sessionService', function () {

  // load the service's module
  beforeEach(module('clickInFrontEndApp'));

  // instantiate service
  var sessionService;
  beforeEach(inject(function (_sessionService_) {
    sessionService = _sessionService_;
  }));

  it('should do something', function () {
    expect(!!sessionService).toBe(true);
  });

});
