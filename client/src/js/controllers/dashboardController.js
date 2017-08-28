app.controller("dashboardController", ['$scope', 'connectHttp', '$localStorage', 'toastr', '$state', '$stateParams', function($scope, connectHttp, $localStorage, toastr, $state) {

  $scope.goToCreateStore = function() {
    $state.go('store');
  }


  connectHttp.getStores($localStorage.userdata._id)
    .then(function(response) {
      var storeDetails = [];
      for (var i = 0; i < response.data.length; i++) {
        storeDetails.push(response.data[i]);
      }
      $scope.storeData = storeDetails;

    }, function(response) {
      toastr.error('Something went wrong');
    })


  $scope.goToItems = function(id, name) {
    connectHttp.getCrust(id)
      .then(function(response) {
        if (response.status == 200 && response.data.message === 'crust not found') {
          $state.go('items.crust', {
            storeName: name,
            storeId : id
          });
        } else if (response.status === 200 && response.data) {
          $state.go('admin.inventory', {
            storeId: id
          });
        }

      }, function(response) {
        toastr.error('Something went wrong');
      });
  }

}]);
