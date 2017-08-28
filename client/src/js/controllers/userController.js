app.controller("userController", ['$scope', '$localStorage', 'connectHttp','$stateParams','$state','$window','toastr', function ($scope, $localStorage, connectHttp,$stateParams,$state,$window,toastr) {
    $scope.userDetails = $localStorage.userdata;


    function init(){
        connectHttp.getSize()
            .then(function (response) {
                var sizeValue = [];
                for (var i = 0; i < response.data.length; i++) {
                    sizeValue.push(response.data[i]);
                }
                $scope.sizeData = sizeValue;
            });

        connectHttp.getCrust()
            .then(function (response) {
                var crustData = [];
                for (var i = 0; i < response.data.length; i++) {
                    crustData.push(response.data[i]);
                }
                $scope.crustValue = crustData;

            });

        connectHttp.getCheese()
            .then(function (response) {
                var cheeseData = [];
                for (var i = 0; i < response.data.length; i++) {
                    cheeseData.push(response.data[i]);
                }
                $scope.cheeseValue = cheeseData;
            });

        connectHttp.getTopping()
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
        console.log($scope.details);
    }

    angular.element('#editUserModal').trigger('click');

    $scope.editUserObject = {};
    $scope.editUser = function(id){
       $scope.editUserObject = {"name":$scope.details.name , "userName":$scope.details.userName, "email":$scope.details.email, "apt":$scope.details.apt, "street": $scope.details.street, "city":$scope.details.city, "province":$scope.details.province, "postal":$scope.details.postal, "phone":$scope.details.phone};
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

    $scope.billObject = [];

    $scope.chooseSize = function(val){
        $scope.billObject.push(val);

    };

    $scope.chooseCrust = function(val){
        $scope.billObject = {"crustName":val.name,"crustPrice":val.price};
        console.log($scope.billObject);
    };

    $scope.chooseCheese = function(val){
        $scope.cheese = val;
    };

    $scope.veggieList = [];
    $scope.chooseVeggie = function(val){
         if($scope.veggieList.length<=2){
             $scope.veggieList.push(val) ;
         }else{
             console.log("exccesdded");
         }
    };

    $scope.meatList = [];
    $scope.chooseMeat = function(val){
        if($scope.meatList.length<=2){
            $scope.meatList.push(val);
        }else{
            console.log("exceded");
        }
    };

    // $scope.billObject = {};
    $scope.postBill = function(){
        console.log("clicked");
        console.log($scope.billObject);
    }


}]);
