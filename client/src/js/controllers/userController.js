app.controller("userController", ['$scope', '$localStorage', 'connectHttp','$stateParams','$state','$window','toastr', function ($scope, $localStorage, connectHttp,$stateParams,$state,$window,toastr) {
    $scope.userDetails = $localStorage.userdata;
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
                    toastr.success('Account has beed deleted successfully!!!');
                }
            });
    };


    // angular.element('#myModal').trigger('click');
    // connectHttp.provinceHttp()
    //     .then(function(response){
    //         $scope.province = response.data;
    //     });

    // $scope.userDetails = {};
    // $scope.update = function(){
    //     console.log (userDetails);
    // }

     // $scope.chooseSize = function (order){
     //     if(!order ){
     //         $scope.size = false;
     //     } else{
     //         $scope.size = true;
     //         $scope.sizeName = order.name;
     //         $scope.sizePrice = order.price;
     //     }
     // };
     //
     // $scope.chooseCrust = function(order){
     //     if(!order){
     //         $sccope.crust = false;
     //     }else{
     //         $scope.crust = true;
     //         $scope.crustName = order.name;
     //         $scope.crustPrice = order.price;
     //     }
     // };
     //
     // $scope.chooseCheese = function(order){
     //     if(!order){
     //         $scope.cheese = false;
     //     }else{
     //         $scope.cheese = true;
     //         $scope.cheeseName = order.name;
     //         $scope.cheesePrice = order.price;
     //     }
     // };

     // var veggieArray = [];
     // $scope.chooseVeggie = function(order){
     //     veggieArray.push(order);
     //     if(!order){
     //         $scope.veggie = false;
     //     }else{
     //         $scope.veggie = true;
     //        $scope.veggieObject = veggieArray;
     //     }
     // };

    // var meatArray =[];
    // $scope.chooseMeat = function(order){
    //     meatArray.push(order);
    //     if(!order){
    //         $scope.meat = false;
    //     }else{
    //         $scope.meat = true;
    //         $scope.meatObject = meatArray;

    //     }
    // };




}]);
