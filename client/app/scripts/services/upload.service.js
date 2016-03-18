'use strict';

(function (window, angular) {
  angular.module('clientApp')
    .factory('UploadService', ['$resource', function ($resource) {

      return $resource('http://localhost:3000/upload/', null, {
        upload: {
          method: 'post', cache: false
        }

      });
    }]);
})(window, angular);
