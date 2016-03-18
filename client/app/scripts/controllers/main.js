'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
(function (jquery, angular) {
  angular.module('clientApp')
    .controller('MainCtrl', ['$state', 'MainService', '$http', '$cookieStore','$location','$scope', function ($state, MainService, $http, $cookieStore,$location,$scope) {
      var _this = this;
      var _successAccountLogin = function (data) {

        if (data && data.status) {
          $cookieStore.put("user", data.data);
          $state.go("main.home")
        }
        else {
          $state.go("main")
        }
      };

      var _failAccountLogin = function (data) {
        //Show Message
        if (data.data) {
          _this.message = {
            type: 'error',
            text: 'Invalid User Email/Password'
          };
        }
      };
      _this.init = function () {
        _this.pageClass = 'page-home';
      };
      _this.login = function () {
        console.log(">>>>>>>>>>")
        var payload = {
          email: _this.email,
          password: _this.password
        };
        MainService.login(payload, _successAccountLogin, _failAccountLogin);
      };
      _this.home = function () {
        if( $cookieStore.get("user")){
          $state.go("main.home");
          return
        }
        $state.go("main")
      };
      _this.logout = function () {
        $cookieStore.remove("user");
        $state.go("main")
      };

    }])
})(jQuery, angular);
