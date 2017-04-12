app.controller('logoutController', ['$scope', '$location', 'toastr', 'connectHttp', '$window', '$state','$stateParams', function ($scope, $location, toastr, connectHttp, $window, $state,$stateParams) {
    $scope.state = $state;
    $scope.logout = function () {
        connectHttp.logoutHttp()
            .then(function (response) {
                $window.localStorage.clear();
                // $location.path('/Login');
                $state.transitionTo('login', $stateParams, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
                toastr.success('Successfully Logged Out!!');
            }, function (response) {
                toastr.error('Please Try Again');
            });
    };
}]);
