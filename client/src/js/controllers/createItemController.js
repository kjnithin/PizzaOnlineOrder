app.controller("createItemController", ['$scope', 'connectHttp', '$localStorage', 'toastr', '$state', '$stateParams', function($scope, connectHttp, $localStorage, toastr, $state, $stateParams) {

  $scope.storeName = $stateParams.storeName;
  $scope.storeId = $stateParams.storeId;

  $scope.crustForm = {};

  $scope.createCrust = function() {

    $scope.crust = {
      name: $scope.crustForm.name,
      price: $scope.crustForm.price,
      image: "https://s3.amazonaws.com/uplaods/crust.jpg",
      store: $scope.storeId
    }

    connectHttp.postCrust($scope.crust)
      .then(function(response) {
        if (response.status == 200) {
          $state.go('items.size')
        }
      }, function(response) {
        toastr.error('Something went wrong!!!');
      })
  }



  $scope.sizeForm = {};

  $scope.createSize = function() {

    $scope.size = {
      name: $scope.sizeForm.name,
      price: $scope.sizeForm.price,
      image: "https://s3.amazonaws.com/uplaods/pizza.jpg",
      store: $scope.storeId
    }

    connectHttp.postSize($scope.size)
      .then(function(response) {
        if (response.status == 200) {
          $state.go('items.cheese')
        }
      }, function(response) {
        toastr.error('Something went wrong!!');
      })
  }


  $scope.cheeseForm = {};

  $scope.createCheese = function() {

    $scope.cheese = {
      name: $scope.cheeseForm.name,
      price: $scope.cheeseForm.price,
      image: "https://s3.amazonaws.com/uplaods/cheese.jpg",
      store: $scope.storeId
    }

    connectHttp.postCheese($scope.cheese)
      .then(function(response) {
        if (response.status == 200) {
          $state.go('items.topping')
        }
      }, function(response) {
        toastr.error('Sommething went wrong!!!');
      })
  }

  $scope.toppingForm = {};

  $scope.createTopping = function() {

    if ($scope.toppingForm.value === 'veggie') {
      $scope.topping = {
        name: $scope.toppingForm.name,
        value: $scope.toppingForm.value,
        price: $scope.toppingForm.price,
        image: "https://s3.amazonaws.com/uplaods/veggie.jpg",
        store: $scope.storeId
      }
    } else if ($scope.toppingForm.value === 'meat') {
      $scope.topping = {
        name: $scope.toppingForm.name,
        value: $scope.toppingForm.value,
        price: $scope.toppingForm.price,
        image: "https://s3.amazonaws.com/uplaods/meat.jpg",
        store: $scope.storeId
      }
    }

    connectHttp.postTopping($scope.topping)
      .then(function(response) {
        if (response.status == 200) {
          $state.go('admin.inventory', {
            storeId: $scope.storeId
          })
        }
      }, function(response) {
        toastr.error('Something went wrong');
      })
  }


}]);
