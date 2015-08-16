'use strict';

/**
 * @ngdoc service
 * @name clickInFrontEndApp.sessionService
 * @description
 * # sessionService
 * Service in the clickInFrontEndApp.
 */
angular.module('clickInFrontEndApp')
  .service('sessionService', function ($resource) {
    this.code = "BARK";

    this.Lecture = $resource('http://clickin-backend.herokuapp.com/api/sessions/:session_code',
      {session_code: this.code},
      {
        pupdate:{method: 'PATCH'}
      }
    )
    this.question = {};
    this.answers = [];

  });
