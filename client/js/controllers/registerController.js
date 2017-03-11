app.controller('registerController', ['$scope', '$location', 'toastr', 'connectHttp', '$state', function($scope, $location, toastr, connectHttp,$state) {
    $scope.registerForm = {};

    $scope.register = function() {
        connectHttp.registerHttp($scope.registerForm)
            .then(function(response) {
                $location.path('/Login');
                toastr.success('Successfully Registered!!');
            }, function(response) {
                toastr.error('Invalid Credentials');
            });
    };

    connectHttp.provinceHttp()
        .then(function(response) {
            $scope.provinceName = response.data;
        }, function errorCallback(response) {
            toastr.error('Invalid Credentials' + response.data.error);
        });

    $scope.backToLogin = function() {
        $state.go('login');
    }

}]);