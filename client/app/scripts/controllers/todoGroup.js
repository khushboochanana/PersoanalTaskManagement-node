'use strict';

(function (jquery, angular) {
  angular.module('clientApp')
    .controller('TodoGroupCtrl',['$state','$http','TodoGroupService','$stateParams','$cookieStore',function ($state,$http,TodoGroupService,$stateParams,$cookieStore) {
      var _this=this;
      var getUserId= function () {
        return localStorage["userId"];
      };
      var _successTodoGroup = function (data) {

        if(data.status){
          console.log("group created")
          $state.transitionTo("main.home",null,{reload: true})
        }
      };

      var _failTodoGroup = function (data) {
        //Show Message
        if (data.data) {
          _this.message = {
            type: 'error',
            text: 'Invalid User Email/Password'
          };
        }
      };
      _this.init=function(){
        $state.go("home")
      };
      _this.addTodoGroup=function(){
        var payload={
          name: _this.group.name,
          userId: $cookieStore.get("user")._id
        };
        TodoGroupService.add(payload, _successTodoGroup, _failTodoGroup);
      }
    }])
})(jQuery,angular);
