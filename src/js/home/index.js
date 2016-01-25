var angular = require('angular');

angular.module('pollicioneApp.home', [
  require('angular-ui-router')
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'js/home/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'home',
      authenticate: true
    });
}])

.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($http, APP_CONFIG, $state, $window) {
  var vm = this;

  vm.go = function(path, param) {
    $state.go(path, {'eventId': param});
  };

  vm.swipe = function(path) {
    $state.go(path);
  };

  $http.get(APP_CONFIG.apiURL + '/api/events?token=' + $window.sessionStorage.token)
    .then(function(resp) {
      vm.positiveEvents = resp.data.positiveEvents;
      vm.pendingEvents = resp.data.pendingEvents;
    });
}