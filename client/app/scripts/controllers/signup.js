'use strict';


angular.module('clientApp')
  .controller('SignupCtrl',['UserService','$state', function (UserService,$state) {
    var _this=this;
    var _successAccountSignup = function (data) {
      if(data&& data.status)
      {
      _this.message=data.message;
      }
      $state.go('main')
    };

    var _failAccountSignup = function (data) {

      //Show Message
      if (data && !data.status) {
        _this.message =data.message
      }
    };
    _this.pageClass = 'page-signUp';
    _this.signUp=function(){
      var payload={
        name:_this.name,
        email:_this.email,
        phone:_this.phone,
        password:_this.password
      };
      UserService.signup(payload, _successAccountSignup, _failAccountSignup);
    }

  }]);
