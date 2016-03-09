angular.module('mapEventsApplication').config(function($stateProvider, $urlRouterProvider, $logProvider, $ionicConfigProvider, $compileProvider){

  // Desabilitando log.
  $logProvider.debugEnabled(false);

  // Desabilitando jsScrolling
  $ionicConfigProvider.scrolling.jsScrolling(false);

  $ionicConfigProvider.navBar.alignTitle('center');

  // $ionicNativeTransitionsProvider.enable(false);

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|blob):|data:image\//);

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
