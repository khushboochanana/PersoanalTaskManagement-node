'use strict';

(function (window, angular) {
  angular.module('clientApp')
    .factory('SignUpService', ['$resource', function ($resource) {
      return $resource('http://localhost:3000/users', null, {
        signup: {method: 'post',cache : false},
        reset: {method: 'put',cache : false}
      });
    }]);
})(window, angular);
