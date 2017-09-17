app.controller("dashboardController", ['$scope', 'connectHttp', '$localStorage', 'toastr', '$state', '$stateParams', function($scope, connectHttp, $localStorage, toastr, $state, $stateParams) {

 $scope.userId = $stateParams.userId;

 if(!$localStorage.userId){
   $state.go('login');
   toastr.info('Please Login');
 }

 if($localStorage.userdata.role === 'owner'){
   $scope.hideCreateStore = true;
 }

  $scope.goToCreateStore = function() {
    $state.go('store');
  }


  connectHttp.getStoresByOwner($scope.userId)
    .then(function(response) {
      if(response.data.length<=0){
        $scope.store = true;
      }
      else if(response.data.success === false && response.data.message == "Store not found"){
          $scope.store = true;
      }
      else{
        var storeDetails = [];
        for (var i = 0; i < response.data.length; i++) {
          storeDetails.push(response.data[i]);
        }
        $scope.storeData = storeDetails;
      }
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
  };

 connectHttp.getStores()
 .then(function(response){
   var storeObject = [];
   for (var i = 0; i < response.data.length; i++) {
     storeObject.push(response.data[i]);
   }
   $scope.storeDetails = storeObject;
 }, function(response) {
   toastr.error('Something went wrong');
 });

 $scope.gotoStore = function(name , id){
   connectHttp.getCrust(id)
   .then(function(response){
     if(response.status == 200 && response.data.message === 'crust not found'){
      toastr.error("There are no items in this store .. Please choose another store")
     }
     else if(response.status === 200 && response.data){
       $state.go('user.order',({storeName : name , storeId : id}));
     }

   })
 }

 angular.element('#deleteStoreModal').trigger('click');
 $scope.deleteStoreItem = function(store) {
   $scope.item = store;
 }

 $scope.deleteStore = function(item, val, store) {
   connectHttp.deleteStore(val)
     .then(function(response) {
       if (response.status === 200) {
         angular.element('#deleteStore').modal('hide');
         angular.element('body').removeClass('modal-open');
         angular.element('.modal-backdrop').remove();
         var index = store.indexOf(item);
         store.splice(index, 1);
         toastr.success('deleted successfully!!!');
       } else {
         toastr.error('Something is Wrong!!!');
       }
     });
 };


}]);
