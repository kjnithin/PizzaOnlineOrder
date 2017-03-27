app.controller("adminController", ['$scope', 'connectHttp','toastr','$localStorage', function($scope, connectHttp, toastr, $localStorage) {

    connectHttp.getAllUser()
        .then(function(response) {
            var userDetails = [];
            var personalDetails = [];
            for (var i = 0; i < response.data.length; i++) {

                if (response.data[i].role === "user") {
                    userDetails.push(response.data[i]);
                } else if (response.data[i].role === "admin") {
                    personalDetails.push(response.data[i]);
                }
            }
            $scope.userValue = userDetails;
            $scope.personal = personalDetails;
            if(userDetails.length <= 0){
                $scope.showAlert =true;
            }
        });

    $scope.adminDetails = $localStorage.userdata;

    $scope.delete = {
        showTooltip: true,
        tipDirection: 'bottom'
    };

    $scope.delete = function(val, userData, index) {
        connectHttp.deleteUser(val)
            .then(function(response) {
               if(response.status === 200){
                   userData.splice(index,1);
                   if(userData.length <= 0){
                       $scope.showAlert = true;
                   }
               }
               else{
                   toastr.error('Error!!!');
               }

            });
    };

    connectHttp.getSize()
        .then(function(response){
            var sizeValue = [];
            for(var i=0;i<response.data.length;i++){
                sizeValue.push(response.data[i]);
            }
            $scope.sizeData = sizeValue;
        });

    $scope.deleteSize = function(val,size,index){
        connectHttp.deleteSize(val)
            .then(function(response){
                if(response.status === 200){
                    size.splice(index,1);
                }
                else{
                    toastr.error('Error!!!');
                }
            });
    };

    connectHttp.getCrust()
        .then(function(response){
            var crustData = [];
            for(var i=0;i<response.data.length;i++) {
                crustData.push(response.data[i]);
            }

            $scope.crustValue= crustData;

    });

    $scope.deleteCrust = function(val,crust,index){
        connectHttp.deleteCrust(val)
            .then(function(response){
                if(response.status === 200){
                    crust.splice(index,1);
                }
                else{
                    toastr.error('Error!!!');
                }
            });
    };

    connectHttp.getCheese()
        .then(function (response){
            var cheeseData = [];
            for(var i=0;i<response.data.length;i++){
                cheeseData.push(response.data[i]);
            }
            $scope.cheeseValue = cheeseData;
        });

    $scope.deleteCheese = function(val,cheese,index){
        connectHttp.deleteCheese(val)
            .then(function(response){
                if(response.status === 200){
                    cheese.splice(index,1);
                }
                else{
                    toastr.error('Error!!!');
                }
            });
    };

    connectHttp.getTopping()
        .then(function (response){
            var toppingValue = [];
            for(var i=0;i<response.data.length;i++){
                toppingValue.push(response.data[i]);
            }
            $scope.toppingData = toppingValue;
        });

    $scope.deleteVeggieTopping = function(val,veggieTopping,index){
        connectHttp.deleteToppings(val)
            .then(function(response){
                console.log(response);
                if(response.status === 200){
                    console.log(veggieTopping,index);
                    veggieTopping.splice(index,1);
                }
                else{
                    toastr.error('Error!!!');
                }
            });
    };

    $scope.deleteTopping = function(val,meatTopping){
        connectHttp.deleteToppings(val)
            .then(function(response){
                if(response.status === 200){
                    $scope.toppingData.splice($scope.toppingData.indexOf(meatTopping),1);
                }
                else{
                    toastr.error('Error!!!');
                }
            });
    };


}]);
