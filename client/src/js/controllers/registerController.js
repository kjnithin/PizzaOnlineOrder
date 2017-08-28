app.controller('registerController', ['$scope', '$location', 'toastr', 'connectHttp', '$state', function($scope, $location, toastr, connectHttp,$state) {
    $scope.registerForm = {};

    $scope.register = function() {
        connectHttp.registerHttp($scope.registerForm)
        .then(function(response) {
                console.log(response);
                $location.path('/Login');
                toastr.success('Successfully Registered!!');
            }, function(response) {
                toastr.error('Invalid Credentials');
            });
    };

    $scope.phone =/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;

    connectHttp.provinceHttp()
        .then(function(response) {
            $scope.provinceName = response.data;
        }, function (response) {
            toastr.error('Invalid Credentials' + response.data.error);
        });

    $scope.backToLogin = function() {
        $state.go('login');
    };

}]);
