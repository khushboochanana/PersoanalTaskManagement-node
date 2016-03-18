angular.module('clientApp')
  .controller('ResetPasswordCtrl',['$cookieStore','SignUpService', function ($cookieStore,SignUpService) {
    var _this=this;
console.log( $cookieStore.get('user'));
    _this.resetPassword=function(){
      console.log("inside init");

      if(_this.newPassword!=_this.confirmPassword)
      {
        _this.message="Your password is not same as confirm password"
       return
      }
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
      SignUpService.reset({},_successTodo,_failTodo)
    }
  }]);
