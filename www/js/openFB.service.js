(function() {
  'use strict';

  angular
    .module('ionicFacebookIntergration.services', [])
    .service("openFBService", openFBService);

    openFBService.$inject = ['$q', '$ionicLoading', '$ionicPopup']

    function openFBService($q, $ionicLoading, $ionicPopup){

      function init(access_token){
        // localStorage["fbAccessToken"] = access_token;
        openFB.init({appId: '132817680413514', sessionStorage: window.localStorage});
      }

      function login(callback){
        openFB.login(callback, {scope: 'email, publish_actions, user_photos'});
      }

      function getAlbumList(){
        var deferred = $q.defer();
        openFB.api({
          method: 'GET',
          path: '/me/albums',
          params: {
            fields: 'id'
          },
          success: function(albums){
            deferred.resolve(albums.data);
          },
          error: errorHandler
        });
        return deferred.promise;
      }

      function getAlbumCover(album_id){
        var deferred = $q.defer();
        openFB.api({
          method: 'GET',
          path: '/'+ album_id,
          params: {
            fields: 'picture.type(album), count, name'
          },
          success: function(album){
            deferred.resolve(album);
          },
          error: errorHandler
        });
        return deferred.promise;
      }


      function getAlbumsSummary(){
        var self = this;
        var deferred = $q.defer();
        self.getAlbumList().then(function(albums){
          angular.forEach(albums, function(album){
            self.getAlbumCover(album.id).then(function(albumObject){
              album["picture_url"] = albumObject.picture.data.url;
              album["count"] = albumObject.count;
              album["name"] = albumObject.name
            });
          });
          deferred.resolve(albums);
        });
        return deferred.promise;
      }

      function getPhotos(album_id){
        var deferred = $q.defer();
        openFB.api({
          method: 'GET',
          path: '/'+ album_id +'/photos',
          params: {
            fields: 'source'
          },
          success: function(photos){
            deferred.resolve(photos.data);
          },
          error: errorHandler
        });
        return deferred.promise;
      }

      function errorHandler(error){
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'Error',
          template: error.message
        });
      }

      return {
        init: init,
        login: login,
        getAlbumsSummary: getAlbumsSummary,
        getAlbumList: getAlbumList,
        getAlbumCover: getAlbumCover,
        getPhotos: getPhotos
      }
    }
})();
