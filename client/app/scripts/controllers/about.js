'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AboutCtrl', function () {
    var _this=this;
    _this.pageClass = 'page-about';

    //authorizing.singleUser({id:"1"},function(data){console.log(data)},function(error){console.log("error")})

  });

angular.module('clientApp')
  .directive("phone",function(){
    return{
      scope:{
        dial:"&"
      }
      ,
      template:"<input type='text' ng-model='value'>{{value}}<div class='button' ng-click='dial({m:value})'> hoooo</div>"
    }
  });
