angular.module('mapEventsApplication').factory('modaisservice', function($ionicModal){

  return {

    configureTemplateModal: function($scope, categoryName, callback){

      var templateUrl = '';      

      switch(categoryName){
        case 'buraconavia':{
          templateUrl = 'templates/modais/buraconaviamodal.html',
          $scope.categoryCode = 1;
          break;
        }
      }

      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal){

        if(callback){
          callback(modal);
        }

      });

    }

  }

});
