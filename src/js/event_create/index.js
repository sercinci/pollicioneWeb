var angular = require('angular');

angular.module('pollicioneApp.eventCreate', [
  require('angular-ui-router')
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('eventCreate', {
      url: '/event_create',
      templateUrl: 'js/event_create/event_create.html',
      controller: 'EventCreateCtrl',
      controllerAs: 'eventCreate'
    });
}])

.controller('EventCreateCtrl', EventCreateCtrl);

function EventCreateCtrl($http, APP_CONFIG, $state, $window) {
  var vm = this;

  $http.get(APP_CONFIG.apiURL + '/api/newevent?token=' + $window.sessionStorage.token)
    .then(function(resp) {
      vm.userGroups = resp.data.userGroups;
    });

  vm.swipe = function(path) {
    $state.go(path);
  };

  vm.go = function(path) {
    $state.go(path);
  };

  vm.create = function(w) {
    var eventData = {
      title: w.title,
      description: w.description,
      date: w.date,
      expire_date: w.expire_date,
      min_partecipants: w.min_partecipants,
      group_id: w.groupId
    }

    $http.post(APP_CONFIG.apiURL + '/api/newevent?token=' + $window.sessionStorage.token, eventData, {withCredentials: true})
      .then(function(resp) {
        if (resp.data.success === true) {
          //alert('weila' + w.date);
          $state.go('home');
        } else {
          $state.reload('eventCreate');
          vm.message = resp.data.message;
          console.log(resp.data.message) //creare messaggio errore
        }
      });

  }
}