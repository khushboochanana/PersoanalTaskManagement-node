'use strict';

(function (window, angular) {
  angular.module('clientApp').directive("color", function () {
    console.log("color");
  return {
    restrict: 'A',
    link: function (scope, element) {
      var colors = ['#10E8C6', '#D5FF48', '#FFFF7D', '#FFCFDD', '#FFD548', "#AEFAF8"];
      element.css('background-color', colors[Math.floor((Math.random() * 6))]);
    }
  }
})
})(window, angular);
