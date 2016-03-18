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
    .controller('TodoCtrl',['$state','$http','TodoService','TodoGroupService',function ($state,$http,TodoService,TodoGroupService) {
      var _this=this;

      var _successTodo = function (data) {
        if(data.status){
          $state.go("home.todo")
        }
      };

      var _failTodo = function (data) {
        //Show Message
        if (data.data) {
          _this.message = {
            type: 'error',
            text: 'Invalid User Email/Password'
          };
        }
      };
      var _successGetTodoGroups = function (data) {
        if(data && data.status){
          console.log(data)
          _this.groups=data.data
        }
      };

      var _failGetTodoGroups = function (data) {
        if (data.data) {
          _this.message = {
            type: 'error',
            text: 'Invalid User Email/Password'
          };
        }
      };
      _this.init=function(){
        TodoGroupService.get(_successGetTodoGroups,_failGetTodoGroups);
        $state.go("home.todo")
      };
      _this.addTodo=function(){
        console.log("LOGIN");
        var payload={
            task: _this.task,
            completed: false,
          todoGroupId: _this.todoGroup
        };
        console.log(payload)
        TodoService.add(payload, _successTodo, _failTodo);
      }
    }])
})(jQuery,angular);
