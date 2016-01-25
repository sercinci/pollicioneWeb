var angular = require('angular');

angular.module('pollicioneApp.eventDetail', [
  require('angular-ui-router')
])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('eventDetail', {
      url: '/event/{eventId}',
      templateUrl: 'js/event_detail/event_detail.html',
      controller: 'EventDetailCtrl',
      controllerAs: 'eventDetail',
      authenticate: true
    });
}])

.controller('EventDetailCtrl', EventDetailCtrl);

function EventDetailCtrl($http, APP_CONFIG, $state, $window, $stateParams) {
  var vm = this;
  
  $http.get(APP_CONFIG.apiURL + '/api/events/' + $stateParams.eventId + '?token=' + $window.sessionStorage.token)
    .then(function(resp) {
      var guest = resp.data.guest;
      vm.eve = resp.data.eve;
      guest == -1 ? vm.show = true : vm.show = false;
    });

  vm.swipe = function(path) {
    $state.go(path);
  };
  
  vm.progress = function() {
    var now = new Date().getTime();
    return 100 - Math.round((new Date(vm.eve.expire_date).getTime() - now) / (1000000))
  };

  vm.reply = function(reply) {
    var userReply = {
      reply: reply,
    };
    $http.post(APP_CONFIG.apiURL + '/api/events/' + $stateParams.eventId + '?token=' + $window.sessionStorage.token, userReply)
    .then(function(resp) {
      console.log(resp)
      $state.go('home');
    })
  }
}