var angular = require('angular');

angular.module('pollicioneApp.groupCreate', [
  require('angular-ui-router'),
  'ngMaterial'
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('groupCreate', {
      url: '/group_create',
      templateUrl: 'js/group_create/group_create.html',
      controller: 'GroupCreateCtrl',
      controllerAs: 'groupCreate'
    });
}])

.controller('GroupCreateCtrl', GroupCreateCtrl);

function GroupCreateCtrl($http, APP_CONFIG, $state, $window, $mdConstant) {
  var vm = this;

  vm.keys = [$mdConstant.KEY_CODE.COMMA];
  vm.tags = [];

  vm.swipe = function(path) {
    $state.go(path);
  };

  vm.create = function(w) {
    var groupData = {
      name: w.name,
      description: w.description,
      members: w.members
    }
    $http.post(APP_CONFIG.apiURL + '/api/newgroup?token=' + $window.sessionStorage.token, groupData, {withCredentials: true})
      .then(function(resp) {
        if (resp.data.success == true) {
          $state.go('group');
        } else {
          $state.reload('groupCreate');
          vm.message = resp.data.message;
          console.log(resp.data.message) //creare messaggio errore
        }
      });

  }
}