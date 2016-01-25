var angular = require('angular');

angular.module('pollicioneApp.login', [
  require('angular-ui-router')
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'js/login/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    });
}])

.controller('LoginCtrl', LoginCtrl);

function LoginCtrl($http, APP_CONFIG, $state, $window) {
  var vm = this;
  /*
  $http.get(APP_CONFIG.apiURL + '/api/signin')
    .then(function(resp) {
      console.log(resp.data);
      var message = resp.data;
      console.log(message.Message);
    });
  */
  vm.go = function(path) {
    $state.go(path);
  };

  vm.signIn = function(w) {
    var userData = {
      username: w.username,
      password: w.password
    }
    console.log(userData)
    $http.post(APP_CONFIG.apiURL + '/api/signin', userData, {
        withCredentials: true
      })
      .then(function(resp) {
        console.log(resp.data);
        if (resp.data.success === true) {
          $window.sessionStorage.token = resp.data.token;
          $state.go('home');
          //console.log($window.sessionStorage.token)
        } else {
          delete $window.sessionStorage.token;
          $state.reload('login');
          console.log(resp.data.message) //creare messaggio errore
        }
      });

  }
}