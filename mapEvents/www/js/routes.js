angular.module('mapEventsApplication').config(function($stateProvider, $urlRouterProvider, $logProvider, $ionicConfigProvider){

  // Desabilitando log.
  $logProvider.debugEnabled(false);

  // Desabilitando jsScrolling
  $ionicConfigProvider.scrolling.jsScrolling(false);

  $ionicConfigProvider.navBar.alignTitle('center');

  // $ionicNativeTransitionsProvider.enable(false);

  $stateProvider.state('mainscreen',{
      url: '/mainscreen',
      templateUrl: 'templates/mainscreen.html',
      abstract: true,
      controller: 'appController'
    })

    .state('mainscreen.homemap', {
      url: '/homemap',
      views: {
        'menucontentview': {
          templateUrl: 'templates/homemap/homemap.html',
          controller: 'homeMapController'
        }
      }
    })

    $urlRouterProvider.otherwise('mainscreen/homemap');

});
