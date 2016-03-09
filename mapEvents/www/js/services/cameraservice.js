angular.module('mapEventsApplication').factory('camera', function($q){

  return {

    getPicture: function(options){

      var q = $q.defer();

      navigator.camera.getPicture(function(result){

        q.resolve("data:image/jpeg;base64,"+result);
        
      }, function(err){

        q.reject(err);

      }, options);

      return q.promise;

    }

  }

});
