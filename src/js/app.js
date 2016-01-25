var angular = require('angular');
//var moment = require('moment');

require('./login');
require('./home');
require('./signup');
require('./group');
require('./group_detail');
require('./group_create');
require('./event_detail');
require('./event_create');

angular.module('pollicioneApp', [
  require('angular-ui-router'),
  require('angular-aria'),
  require('angular-animate'),
  require('angular-material'),
  'pollicioneApp.login',
  'pollicioneApp.home',
  'pollicioneApp.signup',
  'pollicioneApp.group',
  'pollicioneApp.groupDetail',
  'pollicioneApp.groupCreate',
  'pollicioneApp.eventDetail',
  'pollicioneApp.eventCreate',
  'ngMaterial',
  //'ngMaterialDatePicker',
  //'ngMdIcons'
])

.constant('APP_CONFIG', {
  'apiURL': 'http://pollicione.eu-gb.mybluemix.net',
  //10.213.4.78
  //'apiURL': 'http://10.213.4.78:4000',
})
/*
.config(function($httpProvider, $mdThemingProvider) {
  $httpProvider.defaults.useXDomain = true;
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('deep-orange')
    .warnPalette('red')
    .backgroundPalette('grey');
});
*/

/*
.constant('APP_CONFIG', { //verificare!!
  'apiURL': 'https://api.parse.com',
  'X-Parse-Application-Id': 'sWaSkc9RR6boKZvZki2qkuu7nLzRq75p0E3E5GQS',
  'X-Parse-JavaScript-Key': 'WjcVoHtgTwShNz3hjKkC9dLNBeTthKNNYLuFvkOO'
})
*/
.config(['$urlRouterProvider', '$httpProvider', 'APP_CONFIG', '$mdThemingProvider',function($urlRouterProvider, $httpProvider, APP_CONFIG, $mdThemingProvider){

  $httpProvider.defaults.useXDomain = true;
  $mdThemingProvider.theme('default')
    .primaryPalette('orange')
    .accentPalette('deep-orange')
    .warnPalette('red')
    .backgroundPalette('grey');

  //If no url is matched fallback to home state
  $urlRouterProvider.otherwise(function($injector){
    var $state = $injector.get('$state');
    $state.go('login');
  });

  $httpProvider.defaults.headers.common = {
    //'X-Parse-Application-Id' : 'ff6c4fe4-7828-4d0b-bfa8-eda7899fee44',
    //'X-Parse-JavaScript-Key' : APP_CONFIG['X-Parse-JavaScript-Key'],
    'Content-Type' : 'application/json; charset=utf-8'
  };


}]);

