var angular = require('angular');

angular.module('pollicioneApp.signup', [
  require('angular-ui-router')
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'js/signup/signup.html',
      controller: 'SignUpCtrl',
      controllerAs: 'signup'
    });
}])

.controller('SignUpCtrl', SignUpCtrl);

function SignUpCtrl($http, APP_CONFIG, $state, $window) {
  var vm = this;

  vm.go = function(path) {
    $state.go(path);
  };

  vm.signUp = function(w) {
    var userData = {
      username: w.username,
      email: w.email,
      password: w.password
    }
    $http.post(APP_CONFIG.apiURL + '/api/signup', userData, {withCredentials: true})
      .then(function(resp) {
        if (resp.data.success === true) {
          $state.go('login');
        } else {
          $state.reload('signup');
          vm.message = resp.data.message;
          console.log(resp.data.message) //creare messaggio errore
        }
      });

  }
}