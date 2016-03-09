angular.module('mapEventsApplication')
.controller('homeMapController', function($scope, $rootScope, $cordovaGeolocation, $ionicPopup, $timeout, camera){

    $scope.alertPopup = null;

    $scope.map = {
      defaults: {
      tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      zoomControl: false,
      scrollWheelZoom: true,
      tileLayerOptions: {
          detectRetina: true,
          reuseTiles: true
      }
    },

    events: {
      map: {
        enable: ['context'],
        logic: 'emit'
      }
    }};

    var place = {
      name: "Recife - PE",
      latitude: -8.0564394,
      longitude: -34.9221501,
      zoom: 14
    }

    $scope.map.center = {
      lat: place.latitude,
      lng: place.longitude,
      zoom: place.zoom
    }

    $scope.map.markers = [];


    document.addEventListener("resume", function() {
      $scope.$parent.verifyLocationSettings($ionicPopup, $timeout, function(position){
          $scope.addUserMarker(position);
      });
    }, false);


      // defaults: {
      // maxZoom: 16,
      // minZoom: 12,
      // tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
      // tileLayerOptions: {
      //     opacity: 0.9,
      //     detectRetina: true,
      //     reuseTiles: true,
      // }

      // layers: http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
      //         http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png
      //         http://{s}.tile.osm.org/{z}/{x}/{y}.png

    $scope.$on('$ionicView.loaded', function(){
      $scope.$parent.verifyLocationSettings($ionicPopup, $timeout, function(position){
        $scope.addUserMarker(position);
      });
    });

    $scope.toUserLocation = function(){
      $scope.$parent.verifyLocationSettings($ionicPopup, $timeout, function(position){
        $scope.addUserMarker(position);
      });
    }

    $scope.openAlertsPopup = function(){

      $scope.alertPopup = $ionicPopup.show({
        scope: $scope,
        templateUrl: 'templates/alertspopup/alertspopup.html'
      });

    }

    $scope.closeAlertPopup = function(){
      if($scope.alertPopup){
        $scope.alertPopup.close();
      }
    }

    $scope.openHighwayHolePopup = function(){
      $scope.closeAlertPopup();
      $scope.alertPopup = $ionicPopup.show({
        scope: $scope,
        templateUrl: 'templates/highwayholepopup/highwayholepopup.html'
      });
    }

    $scope.getPhoto = function(){
      camera.getPicture().then(function(imageURI){
        $scope.lastPhoto = imageURI;
      }, function(err){
        console.error(err);
      },{
      quality: 100,
      saveToPhotoAlbum: false,
      allowEdit: true
      });
    }

    $scope.addUserMarker = function(position){

      $scope.map.markers = [];

      $scope.map.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 18
      }

      var pointIcon = {
          iconUrl: 'img/baseUiPack/PNG/blue_boxTick.png',
          iconSize:     [28, 28], // size of the icon
          iconAnchor:   [14, 14]  // point of the icon which will correspond to marker's location
      };

      var marker = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  message: 'Here are you baby!',
                  icon: pointIcon
              }


      $scope.map.markers.push(marker);

      divIcon = {
                  type: 'div',
                  iconSize: [100, 100],
                  iconAnchor:  [50, 50],
                  html: '<i class="fa fa-circle-thin fa-3x faa-burst animated header-item pulse-icon"></i>'
              }

      marker = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  message: 'Here are you baby!',
                  icon: divIcon
              }

      $scope.map.markers.push(marker);

    }


});
