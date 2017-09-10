app.controller('registerController', ['$scope', '$location', 'toastr', 'connectHttp', '$state','$localStorage', function($scope, $location, toastr, connectHttp,$state,$localStorage) {
    $scope.registerForm = {};

    $scope.register = function() {
        connectHttp.registerHttp($scope.registerForm)
        .then(function(response) {
                $localStorage.userdata = response.data.user;
                $localStorage.userId = response.data.user._id;
                if (response.data.user.role === "owner") {
                    $state.go('dashboard.admin',{userId : response.data.user._id});
                } else if (response.data.user.role === "user") {
                    $state.go('dashboard.user',{userId : response.data.user._id});
                } else {
                    $state.go('');
                }
                toastr.success('Successfully Logged In!!');
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
