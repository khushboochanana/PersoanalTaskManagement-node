'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */

angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router','angularModalService']).config(['$stateProvider', '$locationProvider','$httpProvider', function ($stateProvider, $locationProvider,$httpProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main',
        params:{user:"new"}
      })
      .state('main.home', {
        url: "dashboard",
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl as dashboard',
        params:{user:"khushboo"}
      }).state('main.home.todoGroup', {
        url: "/todoGroup",
        templateUrl: 'views/todoGroup.html',
        controller: 'TodoGroupCtrl as todoGroup'
      }).state('signup', {
        url: "/signup",
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl as signUp'
      }).state('resetPassword', {
        url: "/resetPassword",
        templateUrl: 'views/resetPassword.html',
        controller: 'ResetPasswordCtrl as reset'
      }).state('about', {
        url: "/about",
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });
  }]);

