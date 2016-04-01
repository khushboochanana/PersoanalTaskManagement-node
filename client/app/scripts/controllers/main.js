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
    .controller('MainCtrl', ['$state', 'MainService', '$http', '$cookieStore','$location','$scope','ModalService', function ($state, MainService, $http, $cookieStore,$location,$scope,ModalService) {
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

      _this.showMessenger = function () {
        if( $cookieStore.get("user")){
          ModalService.showModal({
            templateUrl: "../views/messenger.html",
            controller: "ChatCtrl as chat"
          }).then(function(modal) {

            //it's a bootstrap element, use 'modal' to show it
            modal.element.modal();
            modal.close.then(function(result) {
              console.log(result);
            });
          });
        }

      };

      _this.login = function () {
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
