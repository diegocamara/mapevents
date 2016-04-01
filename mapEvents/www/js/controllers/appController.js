angular.module('mapEventsApplication').controller('appController',
function($scope, $ionicPopup, $timeout, $cordovaGeolocation,
         $ionicPlatform, $cordovaSQLite){

  $scope.isShowLocationMessage = false;
  $scope.noLocationPopup;

  // iniciando o banco.
  var db = $cordovaSQLite.openDB({name: "mapeventsapplication.db"});

  var query = 'CREATE TABLE IF NOT EXISTS TBALERTA (' +
              'ID INTEGER PRIMARY KEY,' +
              'CATEGORIA INTEGER,' +
              'IMAGEM BLOB,' +
              'SEVERIDADE INTEGER,' +
              'COMENTARIOS TEXT,' +
              'LATITUDE NUMERIC,' +
              'LONGITUDE NUMERIC,' +
              'DATA TEXT,' +
              'FACEBOOKID TEXT,' +
              'SINCRONIZADO INTEGER)';


  $cordovaSQLite.execute(db, query).then(function(res){
    console.log(res);
  }, function(err){
    console.error(err);
  });


  $ionicPlatform.onHardwareBackButton(function(event){
     $scope.isShowLocationMessage = false;
     event.preventDefault();
     event.stopPropagation();
  });

  $scope.cancelLocationPopup = function(){
    $scope.isShowLocationMessage = false;
    if($scope.noLocationPopup){
      $scope.noLocationPopup.close();
    }
  }

  $scope.configLocationPopup = function(){
    var diagnostic = cordova.plugins.diagnostic;
    if(diagnostic){
      diagnostic.switchToLocationSettings();
    }
    $scope.cancelLocationPopup();
  }

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

            $scope.noLocationPopup = $ionicPopup.show({
                  templateUrl: 'templates/nolocationpopup/nolocationpopup.html',
                  scope: $scope
                });

              $scope.noLocationPopup.then(function(res){
                  if(res){
                    diagnostic.switchToLocationSettings();
                  }
                });

                $scope.isShowLocationMessage = true;

            }


          }, function(error) {

          });

        }, 500);
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



  //  options = {timeout: 3000, enableHighAccuracy: false};
   //
  //  var watch = $cordovaGeolocation.watchPosition(options);
   //
  //  watch.then(null, function(err){
   //
  //  }, function(position){
   //
  //  });


  }

});
