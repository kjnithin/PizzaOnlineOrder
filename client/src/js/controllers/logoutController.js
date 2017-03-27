app.controller('logoutController',['$scope','$location','toastr','connectHttp','$window', function($scope, $location, toastr, connectHttp, $window) {
    $scope.logout = function() {
            connectHttp.logoutHttp()
            .then(function(response) {
                $window.localStorage.clear();
                $location.path('/Login');
                toastr.success('Successfully Logged Out!!');
            }, function(response) {
                toastr.error('Please Try Again');
            });
    };
}]);
