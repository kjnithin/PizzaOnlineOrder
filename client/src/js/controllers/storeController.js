app.controller("storeController", ['$scope', 'connectHttp', '$localStorage','toastr','$state', '$stateParams', function ($scope, connectHttp,$localStorage,toastr,$state,$stateParams ) {

  var id = $localStorage.userId;

  if(!$localStorage.userId){
    $state.go('login');
    toastr.info('Please Login');
  }

 $scope.storeForm={};

 $scope.createStore = function(){

    $scope.store={
        name: $scope.storeForm.name,
        description: $scope.storeForm.description,
        address: $scope.storeForm.address,
        image: 'https://s3.amazonaws.com/uplaods/store.jpg',
        owner : id
    }

    connectHttp.createStore($scope.store)
    .then(function(response){
        toastr.success('Successfully Created Store!!');
        $state.go('items',{storeName : response.data.name, storeId : response.data._id});
    },function(response){
        toastr.error('Invalid Data');
    })
};

}]);
