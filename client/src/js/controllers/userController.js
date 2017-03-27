app.controller("userController", ['$scope','$localStorage',function($scope,$localStorage){
  $scope.userDetails = $localStorage.userdata;
}]);
