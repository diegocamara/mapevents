angular.module('mapEventsApplication').controller('appController', function($scope, $ionicPopup, $timeout, $cordovaGeolocation, $ionicPlatform){

  $scope.isShowLocationMessage = false;

  $ionicPlatform.onHardwareBackButton(function(event){
     $scope.isShowLocationMessage = false;
     event.preventDefault();
     event.stopPropagation();
  });

  $scope.verifyLocationSettings = function ($ionicPopup, $timeout, callback){
    
    if (window.cordova && !$scope.isShowLocationMessage) {

        $timeout(function () {

          var diagnostic = cordova.plugins.diagnostic;

          diagnostic.isLocationEnabled(function(enabled) {

            if(enabled){

              $scope.getCurrentPosition(function(position){

                if(callback){
                  callback(position);
                }


              });

            } else {

              var poppup = $ionicPopup.show({
                  template: '',
                  title: 'Este app requer localização',
                  scope: null,
                  buttons: [
                    {text: 'Cancelar',
                    onTap: function(e){
                      $scope.isShowLocationMessage = false;
                      return false;
                    }},
                    {text: 'Configurações de localização',
                     onTap: function(e){
                       $scope.isShowLocationMessage = false;
                       return true;
                     }}
                  ]
                });

                poppup.then(function(res){

                  if(res){
                    diagnostic.switchToLocationSettings();
                  }

                });

                $scope.isShowLocationMessage = true;

            }


          }, function(error) {

          });

        }, 1000);
    }
  }

  $scope.getCurrentPosition = function(callback){

    var options = {timeout: 10000, enableHighAccuracy:true};

    $cordovaGeolocation.getCurrentPosition(options).then(function(position){

      if(callback){
        callback(position);
      }

    }, function(error){

      if(error.code != 3){
        alert("Could not get location: " + error.code);
      }

    });

  }

});
