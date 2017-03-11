app.controller("adminController", ['$scope', 'connectHttp', function($scope, connectHttp) {

    connectHttp.getAllUser()
        .then(function(response) {
            var userDetails = [];
            var personalDetails = [];
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].role === "user") {
                    userDetails.push(response.data[i]);
                } else if (response.data[i].role === "admin") {
                    personalDetails.push(response.data[i]);
                }
            }
            $scope.user = userDetails;
            $scope.personal = personalDetails;
        });

    $scope.demo = {
        showTooltip: true,
        tipDirection: 'bottom'
    };

    $scope.delete = function(val) {
        connectHttp.deleteUser(val)
            .then(function(response) {

            });
    };


}]);
