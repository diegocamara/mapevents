angular.module('mapEventsApplication')
.controller('homeMapController',
function($scope, $rootScope, $cordovaGeolocation,
         $ionicPopup, $timeout, $cordovaSQLite, camera,
         $ionicModal, modaisservice, $cordovaSQLite, 
         pouchdbService){

    $scope.alertPopup = null;
    $scope.currentCategoryModal = null;
    $scope.commentsModal = null;
    $scope.categoryCode = null;

    $scope.mapAlerts = [];

    $scope.saveAlert = function(categoryCode){
      if($scope.alerta){

        $scope.alerta.data = new Date();
        $scope.alerta.severidade = Number($scope.alerta.severidade);
        $scope.alerta.categoria = $scope.categoryCode;
        
        pouchdbService.insertAlert($scope.alerta, function(result){
          //console.log(result);
          // pouchdbService.getAllAlerts().then(function(alerts){
          //   console.log(alerts);
          // });
          

          var alert;

         pouchdbService.getAlert(result.id).then(function(doc){
              alert = doc;
              console.log(alert);
         });

        });        

        $scope.currentCategoryModal.remove();
        $scope.alertsModal.remove();
        $scope.loadAlertsModal();

      }
    }

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

        if(!($scope.alerta.latitude || $scope.alerta.longitude)){
          $scope.addUserMarker(position);
        }
          
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

      // layers: http://{s}.tile.openstreetmap.org/{z}/{x}/{buraconaviamodaly}.png
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


    $scope.loadAlertsModal = function(){

      $ionicModal.fromTemplateUrl('templates/modais/alertsmodal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal){
        $scope.alertsModal = modal;
      });

    }    

    $scope.showCommentsModal = function(){

      $ionicModal.fromTemplateUrl('templates/modais/comentariosmodal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal){
        $scope.commentsModal = modal;

        if($scope.commentsModal){

          $scope.commentsModal.show();

          var commentsComponent = document.getElementById('comentariosInputText');

              $timeout(function () {
                commentsComponent.focus();
              }, 100);

        }

      });

    }

    $scope.hideCommentsModal = function(){
      if($scope.commentsModal){
        $scope.commentsModal.remove();
      }
    }

    $scope.hideAndCancelCommentsModal = function(){
      $scope.hideCommentsModal();
      $scope.alerta.comentarios = null;
    }

    $scope.openAlertsModal = function(){
      $scope.categoryCode = null;
      if($scope.alertsModal){
        $scope.alertsModal.show();
      }
    }

    $scope.closeAlertsModal = function(){
      if($scope.alertsModal){
        $scope.alertsModal.hide();
      }
    }

    $scope.openCategoryModal = function(categoryName){
      modaisservice.configureTemplateModal($scope, categoryName, function(modal){
          $scope.currentCategoryModal = modal;
        if($scope.currentCategoryModal){

          if(!$scope.alerta){
            $scope.alerta = obtainDefaultAlertData();
          }          

          $scope.lastPhoto = null;
          $scope.currentCategoryModal.show();
        }
      });
    }

    $scope.closeCategoryModal = function(){
      if($scope.currentCategoryModal){
        $scope.currentCategoryModal.remove();
        $scope.currentCategoryModal = null;
        $scope.alerta = null;
        $scope.lastPhoto = null;
      }
    }



    $scope.getPhoto = function(){
      camera.getPicture().then(function(imageURL){
        $scope.lastPhoto = "data:image/jpeg;base64," + imageURL;
        $scope.alerta._attachments.imagem.data = imageURL;
      }, function(err){
        // console.error(err);
        if($scope.lastPhoto){
          $scope.lastPhoto = null;
          $scope.alerta._attachments.imagem.data = null;
        }
      });
    }


    $scope.addUserMarker = function(position){
      
      if(!$scope.alerta){
        $scope.alerta = obtainDefaultAlertData();
      }

      // Update alert position
      $scope.alerta.latitude = position.coords.latitude;
      $scope.alerta.longitude = position.coords.longitude;

      $scope.map.markers = [];

      $scope.map.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        zoom: 15
      }     

      var pointIcon = {
          iconUrl: 'img/blue_boxTick.png',
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

    $scope.loadAlertsModal();

});

function obtainDefaultAlertData(){
  return {
    categoria: null,
    _attachments: {
      imagem: {
        content_type: 'image/png',
        data: ''
      }
    },    
    severidade: 50,
    comentarios: null,
    latitude: null,
    longitude: null,
    data: null,
    facebookid: null,
    sincronizado: 0,
    isExibirComentarioPreenchido: function(){
      return this.comentarios != null && this.comentarios != '';
    }
  }
}