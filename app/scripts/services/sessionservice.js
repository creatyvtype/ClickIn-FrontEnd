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
    this.code = "";


    this.question = {};
    this.answers = [];

  });
