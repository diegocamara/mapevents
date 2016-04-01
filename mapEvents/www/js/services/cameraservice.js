angular.module('mapEventsApplication').factory('camera', function($q){

  return {

    getPicture: function(){

      var options = {
          quality: 50,
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.DATA_URL,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 640,
          targetHeight: 480,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
    	    correctOrientation:true
    };

      var q = $q.defer();

      navigator.camera.getPicture(function(result){

      var blob = base64toBlob(result, 'image/jpeg');

      // Lê o conteúdo do arquivo blob.
      // var reader = new window.FileReader();
      // reader.readAsDataURL(blob);
      //
      // reader.onloadend = function(){
      //   base64data = reader.result;
      // }

      q.resolve(result);

      }, function(err){

        q.reject(err);

      }, options);

      return q.promise;

    },

    getBlob: function(base64data){
      return base64toBlob(base64data, 'image/jpeg');
    }

  }

});

function base64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    
    var blob = new Blob(byteArrays, {type: contentType});
    
    return blob;
}
