var angular = require('angular');

angular.module('pollicioneApp.group', [
  require('angular-ui-router')
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('group', {
      url: '/groups',
      templateUrl: 'js/group/group.html',
      controller: 'GroupCtrl',
      controllerAs: 'group',
      authenticate: true
    });
}])

.controller('GroupCtrl', GroupCtrl);

function GroupCtrl($http, APP_CONFIG, $state, $window) {
  var vm = this;
  
  vm.swipe = function(path) {
    $state.go(path);
  };
  
  vm.go = function(path, param) {
    $state.go(path, {'groupId': param});
  };
  
  $http.get(APP_CONFIG.apiURL + '/api/groups?token=' + $window.sessionStorage.token)
    .then(function(resp) {
      //vm.username = resp.data.username;
      console.log(resp.data)
      vm.groups = resp.data.groups;
      vm.pendingGroups = resp.data.pendingGroups;
    });
}