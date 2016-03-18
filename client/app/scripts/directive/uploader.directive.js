var dir = angular.module('app.directives', []);
dir.directive('uploader', [function() {

  return {
    restrict: 'E',
    scope: {

      // scope
      // define a new isolate scope

    },

    link: function(scope, elem, attrs, ctrl) {

      elem.find('.uploader').click(function() {
        elem.find('input[type="file"]').click();
      });

    },
    replace: false,
    templateUrl: 'uploader.html'
  };

}]);
