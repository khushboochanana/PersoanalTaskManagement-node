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
    .controller('DashboardCtrl', ['$state', '$scope','$http', 'TodoGroupService','UploadService', 'TodoService','$stateParams','$cookieStore', function ($state, $scope,$http, TodoGroupService,UploadService, TodoService,$stateParams,$cookieStore) {
      var _this = this;
      console.log("dashboard");
      var _successTodo = function (data) {
        if (data.status) {
          _this.groups.forEach(function (value) {
            if (value._id == data.data.todoGroupId) {
              value.todos.push(data.data)
            }
          })
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
        console.log("todododood")
        if (data && data.status) {
          _this.groups = data.data
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
      var _successDeleteTodoGroups = function (data) {

        if (data && data.status) {
          _this.init();
        }
      };

      var _failDeleteTodoGroups = function (data) {
        if (data.data) {
          _this.message = {
            type: 'error',
            text: 'Invalid User Email/Password'
          };
        }
      };
      var _successDeleteTodo = function (data) {
        if (data && data.status) {
          _this.init();
        }
      };

      var _failDeleteTodo = function (data) {
        if (data.data) {
          _this.message = {
            type: 'error',
            text: 'Invalid User Email/Password'
          };
        }
      };
      _this.init = function () {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        _this.userName=$cookieStore.get("user").name;
        _this.userId=$cookieStore.get("user")._id;
        TodoGroupService.get({id:_this.userId},_successGetTodoGroups, _failGetTodoGroups);
      };

      _this.deleteTodoGroup = function (id) {
        TodoGroupService.remove({id: id}, _successDeleteTodoGroups, _failDeleteTodoGroups);
      };

      _this.deleteTodo = function (id) {
        TodoService.remove({id: id}, _successDeleteTodo, _failDeleteTodo);
      };

      _this.checkBoxClick = function (id, completed) {
        var payload = {id: id, completed: completed}
        TodoService.edit(payload, _successDeleteTodo, _failDeleteTodo);

      };
      _this.addTodo = function () {
        var payload = {
          task: _this.task,
          completed: false,
          todoGroupId: _this.todoGroup
        };
        TodoService.add(payload, _successTodo, _failTodo);
      };
      _this.addFile= function (element,groupId) {
        $scope.$apply(function(scope) {
        var data = new FormData();
          _this.attachment=[];
          console.log('???????????',element.files)
          for (var i = 0; i < element.files.length; i++) {
            _this.attachment.push(element.files[i])

            data.append('file', element.files[i]);
            console.log("..............................................")
            console.log(data)

          }
          console.log("...................>>>>>>>>>>>>>>>.............................................");
          $http.post('http://localhost:3000/upload', data, {
            headers : {
              'Content-Type' : undefined
            },
            transformRequest : angular.identity
          })
            .success(function(data)
            {
              console.log(data);
            })
            .error(function(data)
            {
              console.log(data);
            });

        /*  $http.post('http://localhost:3000/upload', data, function(data) {
            console.log('>>>>>>>>>>>>>');
          });*/
     /*     UploadService.upload(data, function (req,res) {
          }, function (err) {

          })*/

        })
      }
    }])
})(jQuery, angular);
