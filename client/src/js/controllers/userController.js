app.controller("userController", ['$scope', '$localStorage', 'connectHttp','$stateParams','$state','$window','toastr', function ($scope, $localStorage, connectHttp,$stateParams,$state,$window,toastr) {
    $scope.userDetails = $localStorage.userdata;
    $scope.storeId = $stateParams.storeId;
    $scope.storeName = $stateParams.storeName;
    $scope.userId = $localStorage.userId;


    function init(){
        connectHttp.getSize($stateParams.storeId)
            .then(function (response) {
                var sizeValue = [];
                for (var i = 0; i < response.data.length; i++) {
                    sizeValue.push(response.data[i]);
                }
                $scope.sizeData = sizeValue;
            });

        connectHttp.getCrust($stateParams.storeId)
            .then(function (response) {
                var crustData = [];
                for (var i = 0; i < response.data.length; i++) {
                    crustData.push(response.data[i]);
                }
                $scope.crustValue = crustData;

            });

        connectHttp.getCheese($stateParams.storeId)
            .then(function (response) {
                var cheeseData = [];
                for (var i = 0; i < response.data.length; i++) {
                    cheeseData.push(response.data[i]);
                }
                $scope.cheeseValue = cheeseData;
            });

        connectHttp.getTopping($stateParams.storeId)
            .then(function (response) {
                var toppingValue = [];
                for (var i = 0; i < response.data.length; i++) {
                    toppingValue.push(response.data[i]);
                }
                $scope.toppingData = toppingValue;
            });
    }

    init();

    angular.element('#myModalShower').trigger('click');

    $scope.deleteAccount = function(id){
        connectHttp.deleteUser(id)
            .then(function(response){
                if(response.status === 200){
                    $window.localStorage.clear();
                    $state.transitionTo('login', $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                    angular.element('#myModalShower').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('Account has been deleted successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            });
    };

    $scope.editItem = function(val){
        $scope.details = val;
    }

    angular.element('#editUserModal').trigger('click');

    $scope.editUserObject = {};
    $scope.editUser = function(id){
       $scope.editUserObject = {
         "name":$scope.details.name ,
         "userName":$scope.details.userName,
         "email":$scope.details.email,
         "apt":$scope.details.apt,
         "street": $scope.details.street,
         "city":$scope.details.city,
         "province":$scope.details.province,
          "postal":$scope.details.postal,
          "phone":$scope.details.phone
        };

       connectHttp.putUser(id, $scope.editUserObject)
           .then(function (response) {
               if(response.status === 200){
                   angular.element('#editUser').modal('hide');
                   angular.element('body').removeClass('modal-open');
                   angular.element('.modal-backdrop').remove();
                   toastr.success('updated successfully!!!');
               }
               else {
                   toastr.error('Something is Wrong!!!');
               }
           })
    };



    $scope.orderButton = true;
    $scope.chooseSize = function(val){
      $scope.orderButton = false;
      $scope.sizeShow = true;
      $scope.size = val
    };


    $scope.chooseCrust = function(val){
      $scope.orderButton = false;
      $scope.crustShow = true;
      $scope.crust = val;
    };

    $scope.chooseCheese = function(val){
      $scope.orderButton = false;
      $scope.cheeseShow = true;
      $scope.cheese = val;
    };

    $scope.veggieList = [];
    $scope.chooseVeggie = function(val){
      $scope.orderButton = false;
      $scope.veggieShow =true;
         if($scope.veggieList.length<=2){
             $scope.veggieList.push(val) ;
         }else{
           toastr.info('Maximum reached');
        }
    };

    $scope.meatList = [];
    $scope.chooseMeat = function(val){
      $scope.orderButton = false;
      $scope.meatShow = true;
        if($scope.meatList.length<=2){
            $scope.meatList.push(val);
        }else{
          toastr.info('Maximum reached');
        }
    };

    $scope.postBill = function(){
        var veggieArr =[];
        var veggieTotal = [];
      for(var i=0;i<$scope.veggieList.length;i++){
          veggieArr.push({name:$scope.veggieList[i].name , price : $scope.veggieList[i].price});
          veggieTotal = parseFloat(veggieTotal+ $scope.veggieList[i].price);
      }


      var meatArr = [];
      var meatTotal =[] ;
      for(var i =0; i<$scope.meatList.length;i++){
        meatArr.push({name:$scope.meatList[i].name , price : $scope.meatList[i].price});
        meatTotal=parseFloat(meatTotal+$scope.meatList[i].price);
      }

      $scope.price = parseFloat($scope.size.price) + parseFloat($scope.crust.price)+parseFloat($scope.cheese.price)+ veggieTotal + meatTotal ;

      $scope.billObject = {
        size:{
          name : $scope.size.name,
          price : $scope.size.price
        },
        crust:{
          name : $scope.crust.name,
          price : $scope.crust.price
        },
        cheese:{
          name : $scope.cheese.name,
          price : $scope.cheese.price
        },
        veggie:veggieArr,
        meat : meatArr,
        total:{
          price : $scope.price
        },
        store: $scope.storeId,
        user : $scope.userId
      }
    }

    $scope.loading = true;

    $scope.orderModel = function(){
      $scope.loading = false;
      connectHttp.postOrder($scope.billObject)
      .then(function(response){
        if(response.status === 200){
            angular.element('#orderBill').modal('hide');
            angular.element('body').removeClass('modal-open');
            angular.element('.modal-backdrop').remove();
            $scope.loading= true;

            setTimeout(function(){
              angular.element('#successModal').modal('show');
            },1000);


           setTimeout(function(){
             angular.element('#successModal').modal('hide');
             angular.element('body').removeClass('modal-open');
             angular.element('.modal-backdrop').remove();
           },4000);

           setTimeout(function(){
             $state.go('user.history',({storeName :$stateParams.storeName, storeId : $stateParams.storeId , userId : $scope.userId }));
            },4000);

            connectHttp.getMyorders($scope.storeId,$scope.userId)
              .then(function(response){
                if(response.data.length <= 0){
                  $scope.showMessage = true;
                }else if(response.data.length > 0){
                  $scope.orderData = response.data;
                }else{
                  $scope.showMessage = true;
                }
              },function(response){
                 toastr.error('Something is wrong !!!!');
              })
        }
        else {
            $scope.loading= true;
            toastr.error('Something is Wrong!!!');
        }
      },function(response){
        $scope.loading= true;
        angular.element('#orderBill').modal('hide');
        angular.element('body').removeClass('modal-open');
        angular.element('.modal-backdrop').remove();

        toastr.error('Something is Wrong!!!');

      })
    };


    connectHttp.getMyorders($scope.storeId,$scope.userId)
      .then(function(response){
        if(response.data.length <= 0){
          $scope.showMessage = true;
        }else if(response.data.length > 0){
          $scope.orderData = response.data;
        }else{
          $scope.showMessage = true;
        }
      },function(response){
         toastr.error('Something is wrong !!!!');
      })


}]);
