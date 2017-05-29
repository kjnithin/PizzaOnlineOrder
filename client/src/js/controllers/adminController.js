app.controller("adminController", ['$scope', 'connectHttp', 'toastr', '$localStorage', function ($scope, connectHttp, toastr, $localStorage) {

    connectHttp.getAllUser()
        .then(function (response) {
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
            if (userDetails.length <= 0) {
                $scope.showAlert = true;
            }
        });

    $scope.adminDetails = $localStorage.userdata;

    $scope.delete = {
        showTooltip: true,
        tipDirection: 'bottom'
    };

    angular.element('#adminModal').trigger('click');
    $scope.openModal = function(user){
        $scope.person = user;
    };

    $scope.delete = function (item, val, userData) {
        connectHttp.deleteUser(val)
            .then(function (response) {
                if (response.status === 200) {
                    angular.element('#adminUserDel').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    var index = userData.indexOf(item);
                    userData.splice(index, 1);
                    if (userData.length <= 0) {
                        $scope.showAlert = true;
                    }
                }
                else {
                    toastr.error('Error!!!');
                }

            });
    };

    connectHttp.getSize()
        .then(function (response) {
            var sizeValue = [];
            for (var i = 0; i < response.data.length; i++) {
                sizeValue.push(response.data[i]);
            }
            $scope.sizeData = sizeValue;
        });

    angular.element('#deleteSizeModal').trigger('click');
    $scope.deleteItem = function(item){
        $scope.item = item;
    }

    $scope.deleteSize = function (item,val, size) {
        connectHttp.deleteSize(val)
            .then(function (response) {
                if (response.status === 200) {
                    angular.element('#deleteSize').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    var index = size.indexOf(item);
                    size.splice(index, 1);
                }
                else {
                    toastr.error('Error!!!');
                }
            });
    };

    connectHttp.getCrust()
        .then(function (response) {
            var crustData = [];
            for (var i = 0; i < response.data.length; i++) {
                crustData.push(response.data[i]);
            }
            $scope.crustValue = crustData;

        });

    angular.element('#deleteCrustModal').trigger('click');
    $scope.deleteCrust = function (item, val, crust) {
        connectHttp.deleteCrust(val)
            .then(function (response) {
                if (response.status === 200) {
                    angular.element('#deleteCrust').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    var index = crust.indexOf(item);
                    crust.splice(index, 1);
                }
                else {
                    toastr.error('Error!!!');
                }
            });
    };

    connectHttp.getCheese()
        .then(function (response) {
            var cheeseData = [];
            for (var i = 0; i < response.data.length; i++) {
                cheeseData.push(response.data[i]);
            }
            $scope.cheeseValue = cheeseData;
        });

    angular.element('#deleteCheeseModal').trigger('click');

    $scope.deleteCheese = function (item, val, cheese) {
        connectHttp.deleteCheese(val)
            .then(function (response) {
                if (response.status === 200) {
                    angular.element('#deleteCheese').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    var index = cheese.indexOf(item);
                    cheese.splice(index, 1);
                }
                else {
                    toastr.error('Error!!!');
                }
            });
    };

    connectHttp.getTopping()
        .then(function (response) {
            var toppingValue = [];
            for (var i = 0; i < response.data.length; i++) {
                toppingValue.push(response.data[i]);
            }
            $scope.toppingData = toppingValue;
        });

    angular.element('#deleteToppingModal').trigger('click');
    $scope.deleteVeggieTopping = function (item , val, veggieTopping) {
        connectHttp.deleteToppings(val)
            .then(function (response) {
                if (response.status === 200) {
                    angular.element('#deletetoppings').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    var index = veggieTopping.indexOf(item);
                    veggieTopping.splice(index, 1);
                }
                else {
                    toastr.error('Error!!!');
                }
            });
    };

    angular.element('#deleteMeatModal').trigger('click');

    $scope.deleteTopping = function (val, meatTopping) {
        connectHttp.deleteToppings(val)
            .then(function (response) {
                if (response.status === 200) {
                    angular.element('#deleteMeat').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    $scope.toppingData.splice($scope.toppingData.indexOf(meatTopping), 1);
                }
                else {
                    toastr.error('Error!!!');
                }
            });
    };


}]);
