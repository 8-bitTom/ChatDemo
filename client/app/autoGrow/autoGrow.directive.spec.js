'use strict';

describe('Directive: autoGrow', function () {

  // load the directive's module
  beforeEach(module('chatAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<auto-grow></auto-grow>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the autoGrow directive');
  }));
});