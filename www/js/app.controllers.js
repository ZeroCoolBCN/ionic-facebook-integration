(function() {
  'use strict';

  angular
    .module('ionicFacebookIntergration.controllers',[])
    .controller('LoginCtrl', LoginCtrl)
    .controller("AlbumsCtrl", AlbumsCtrl)
    .controller("PhotosCtrl", PhotosCtrl)

  LoginCtrl.$inject = ['$scope', '$state', 'openFBService'];
  AlbumsCtrl.$inject = ['$scope', '$state', '$ionicLoading', 'openFBService'];
  PhotosCtrl.$inject = ["$scope", "$stateParams", "$ionicLoading", "$ionicModal", "openFBService"]

  function LoginCtrl($scope, $state, openFBService){
    var vm = $scope.vm = {};
    // View Model
    angular.extend(vm, {
      fbLogin: fbLogin
    });

    function fbLogin(){
      openFBService.login(function(response){
        if(response.status == "connected"){
          // response.authResponse.accessToken
          $state.go("albums");
        } else {
          alert("login failed");
        }
      });
    }
  }

  function AlbumsCtrl($scope, $state, $ionicLoading, openFBService){
    var vm = $scope.vm = {};
    // View Model
    angular.extend(vm, {
      albums: [],
      getAlbumList: getAlbumList()
    });

    function getAlbumList(){
      $ionicLoading.show({template: "Loading..."});
      openFBService.getAlbumsSummary().then(function(albums){
        vm.albums = albums;
        $ionicLoading.hide();
      });
    }
  }

  function PhotosCtrl($scope, $stateParams, $ionicLoading, $ionicModal, openFBService){
    var vm = $scope.vm = {};
    // View Model
    angular.extend(vm, {
      photos: [],
      currentImage: null,
      getPhotos: getPhotos(),
      previewImage: previewImage,
      closeModal: closeModal
    });

    function getPhotos(){
      vm.photos = [];
      $ionicLoading.show({template: "Loading..."});
      openFBService.getPhotos($stateParams.id).then(function(photos){
        vm.photos = photos;
        $ionicLoading.hide();
      });
    }

    // preview attachments, if the type can not preview then show a tips
    function previewImage(photo) {
      $ionicLoading.show();
      $ionicModal.fromTemplateUrl('templates/preview.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.currentImage = photo;
        vm.modal = modal;
        vm.modal.show();
      });
    }

    // Close the modal
    function closeModal() {
      $ionicLoading.hide();
      vm.modal.hide();
      vm.modal.remove();
    }
  }
})();
