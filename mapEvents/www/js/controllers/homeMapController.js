angular.module('mapEventsApplication')
.controller('homeMapController',
function($scope, $rootScope, $cordovaGeolocation,
         $ionicPopup, $timeout, $cordovaSQLite, camera,
         $ionicModal, modaisservice, $cordovaSQLite){

    $scope.alertPopup = null;
    $scope.currentCategoryModal = null;
    $scope.commentsModal = null;

    var db = $cordovaSQLite.openDB({name: "mapeventsapplication.db"});

    $scope.saveAlert = function(){
      if($scope.alerta){

        var query = 'INSERT INTO TBALERTA (CATEGORIA, IMAGEM, SEVERIDADE, COMENTARIOS, LATITUDE, LONGITUDE, DATA, FACEBOOKID, SINCRONIZADO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        $cordovaSQLite.execute(db, query, obtainAlertDataArray($scope, camera)).then(function(res){
          // console.log(res.insertId);
        }, function(err){
          console.error(err);
        });

        query = 'SELECT * FROM TBALERTA';

        $cordovaSQLite.execute(db, query).then(function(res){
          
          for(alert = 0; alert < res.rows.length; alert++){

            if(res.rows.item(alert).IMAGEM){

              console.log(res.rows.item(alert).IMAGEM);

              // var reader = new window.FileReader();
              //     reader.readAsDataURL(res.rows.item(alert).IMAGEM);
                  
              //     reader.onloadend = function(){
              //       base64data = reader.result;
              //       console.log(base64data);
              //     }

            }

            
          }
          
          $scope.currentCategoryModal.remove();
          $scope.alertsModal.remove();

        }, function(err){
          console.error(err);
        });

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

    $ionicModal.fromTemplateUrl('templates/modais/alertsmodal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal){
      $scope.alertsModal = modal;
    });

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
          $scope.alerta = obtainDefaultAlertData();
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
        $scope.alerta.imagem = imageURL;
      }, function(err){
        // console.error(err);
        if($scope.lastPhoto){
          $scope.lastPhoto = null;
        }
      });
    }


    $scope.addUserMarker = function(position){

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

});

function obtainDefaultAlertData(){
  return {
    categoria: null,
    imagem: null,
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

function obtainAlertDataArray($scope, camera){

  var alertArray = [];

  alertArray.push($scope.alerta.categoria);

  if($scope.alerta.imagem){    
    $scope.alerta.imagem = camera.getBlob($scope.alerta.imagem);
    alertArray.push($scope.alerta.imagem);
  }

  alertArray.push($scope.alerta.severidade);
  alertArray.push($scope.alerta.comentarios);
  alertArray.push($scope.alerta.latitude);
  alertArray.push($scope.alerta.longitude);
  alertArray.push($scope.alerta.data);
  alertArray.push($scope.alerta.facebookid);
  alertArray.push($scope.alerta.sincronizado);

  return alertArray;

}
