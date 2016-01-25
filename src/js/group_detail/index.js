var angular = require('angular');

angular.module('pollicioneApp.groupDetail', [
  require('angular-ui-router')
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('groupDetail', {
      url: '/group/{groupId}',
      templateUrl: 'js/group_detail/group_detail.html',
      controller: 'GroupDetailCtrl',
      controllerAs: 'groupDetail',
      authenticate: true
    });
}])

.controller('GroupDetailCtrl', GroupDetailCtrl);

function GroupDetailCtrl($http, APP_CONFIG, $state, $window, $stateParams) {
  var vm = this;
  
  $http.get(APP_CONFIG.apiURL + '/api/groups/' + $stateParams.groupId + '?token=' + $window.sessionStorage.token)
    .then(function(resp) {
      var isMember = resp.data.isMember;
      vm.isOwner = resp.data.isOwner;
      vm.group = resp.data.group;
      isMember == -1 ? vm.show = true : vm.show = false;
    });

  vm.swipe = function(path) {
    $state.go(path);
  };
  
  vm.reply = function(reply) {
    var userReply = {
      reply: reply,
    };
    $http.post(APP_CONFIG.apiURL + '/api/groups/' + $stateParams.groupId + '?token=' + $window.sessionStorage.token, userReply)
    .then(function(resp) {
      console.log(resp.data)
      $state.go('group');
    })
  }

  vm.remove = function(userId) {
    var user = {
      userId: userId,
    };
    $http.post(APP_CONFIG.apiURL + '/api/groups_remove/' + $stateParams.groupId + '?token=' + $window.sessionStorage.token, user)
    .then(function(resp) {
      console.log(resp.data)
      $state.reload('groupDetail', $stateParams.groupId);
    })
  }

  vm.add = function(usernames) {
    var users = {
      usernames: usernames,
    };
    $http.post(APP_CONFIG.apiURL + '/api/groups_add/' + $stateParams.groupId + '?token=' + $window.sessionStorage.token, users)
    .then(function(resp) {
      console.log(resp.data)
      $state.reload('groupDetail', $stateParams.groupId);
    })
  }

  vm.leave = function(userId) {
    var user = {
      userId: userId,
    };
    $http.post(APP_CONFIG.apiURL + '/api/groups_remove/' + $stateParams.groupId + '?token=' + $window.sessionStorage.token, user)
    .then(function(resp) {
      console.log(resp.data)
      $state.go('group');
    })
  }
}