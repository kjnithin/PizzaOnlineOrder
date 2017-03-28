app.controller("userController", ['$scope', '$localStorage', 'connectHttp', function ($scope, $localStorage, connectHttp) {
    $scope.userDetails = $localStorage.userdata;
    connectHttp.getSize()
        .then(function (response) {
            var sizeValue = [];
            for (var i = 0; i < response.data.length; i++) {
                sizeValue.push(response.data[i]);
            }
            $scope.sizeData = sizeValue;
        });

    connectHttp.getCrust()
        .then(function (response) {
            var crustData = [];
            for (var i = 0; i < response.data.length; i++) {
                crustData.push(response.data[i]);
            }

            $scope.crustValue = crustData;

        });

    connectHttp.getCheese()
        .then(function (response) {
            var cheeseData = [];
            for (var i = 0; i < response.data.length; i++) {
                cheeseData.push(response.data[i]);
            }
            $scope.cheeseValue = cheeseData;
        });

    connectHttp.getTopping()
        .then(function (response) {
            var toppingValue = [];
            for (var i = 0; i < response.data.length; i++) {
                toppingValue.push(response.data[i]);
            }
            $scope.toppingData = toppingValue;
        });


}]);
