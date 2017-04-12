app.controller("displayController",['$scope', '$localStorage', function($scope,$localStorage){
    console.log("bye");
    if($localStorage.userdata){
        console.log("hi");
        $scope.name = $localStorage.userdata.name;
        console.log($scope.name);
    }

}]);
