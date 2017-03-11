app.controller('logoutController',['$scope','$location','toastr','connectHttp', function($scope, $location, toastr, connectHttp) {
    $scope.logout = function() {
            connectHttp.logoutHttp()
            .then(function(response) {
                $location.path('/Login');
                toastr.success('Successfully Logged Out!!');
            }, function(response) {
                toastr.error('Please Try Again');
            });
    };
}]);
