'use strict';


angular.module('clientApp')
  .controller('SignupCtrl',['SignUpService','$state', function (SignUpService,$state) {
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
      SignUpService.signup(payload, _successAccountSignup, _failAccountSignup);
    }

  }]);
