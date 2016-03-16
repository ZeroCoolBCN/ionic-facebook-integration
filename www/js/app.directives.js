(function() {
  'use strict';

  angular
    .module('ionicFacebookIntergration.directives', [])
    .directive("resourceonload", resourceonload);

    resourceonload.$inject = ["$ionicLoading"]

    function resourceonload($ionicLoading){
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.bind('load', function() {
            $ionicLoading.hide();
          });
          element.bind('error', function() {
            $ionicLoading.hide();
          });
          element.bind('play', function() {
            $ionicLoading.hide();
          });
        }
      };
    }
})();

