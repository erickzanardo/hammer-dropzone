angular.module('zombieApp', ['hammerjs'])
  .controller('WeaponsController', ['$scope', function($scope) {
      $scope.avaiableWeapons = ['angular_imgs/katana.png', 'angular_imgs/machete.png', 'angular_imgs/pistol.png', 'angular_imgs/rifle.png', 'angular_imgs/shotgun.png'];
      $scope.selectedWeapons = [];
      
      $scope.onDropSelected = function(obj, dropZone) {
          var url = obj.attr('src');
          obj.remove();

          var i = $scope.avaiableWeapons.indexOf(url);
          $scope.avaiableWeapons.splice(i, 1);
          $scope.selectedWeapons.push(url);
      };
      
    $scope.onDropAvaiable = function(obj, dropZone) {
          var url = obj.attr('src');
          obj.remove();

          var i = $scope.selectedWeapons.indexOf(url);
          $scope.selectedWeapons.splice(i, 1);
          $scope.avaiableWeapons.push(url);
      }
  }]);