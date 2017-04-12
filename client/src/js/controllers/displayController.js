app.controller("displayController",['$scope', '$localStorage', function($scope,$localStorage){
    if($localStorage.userdata){
        console.log("hi");
        $scope.name = $localStorage.userdata.name;
        console.log($scope.name);
    }

}]);
