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
    };

    init();

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
                    toastr.success('deleted successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            });
    };

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
                    toastr.success('deleted successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            });
    };

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
                    toastr.success('deleted successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            });
    };

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
                    toastr.success('deleted successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
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
                    toastr.success('deleted successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            });
    };

    angular.element('#addSizeModal').trigger('click');

    $scope.addSizeForm = {};
    $scope.submitSize = function(){
        connectHttp.postSize($scope.addSizeForm)
            .then(function(response){
                if(response.status === 200){
                    init();
                    angular.element('#addSize').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('Added successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };

    angular.element('#addCrustModal').trigger('click');

    $scope.addCrustForm = {};
    $scope.submitCrust = function(){
        connectHttp.postCrust($scope.addCrustForm)
            .then(function(response){
                if(response.status === 200){
                    init();
                    angular.element('#addCrust').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('Added successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };

    angular.element('#addCheeseModal').trigger('click');

    $scope.addCheeseForm = {};
    $scope.submitCheese = function(){
        connectHttp.postCheese($scope.addCheeseForm)
            .then(function(response){
                if(response.status === 200){
                    init();
                    angular.element('#addCheese').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('Added successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };

    angular.element('#addToppingModal').trigger('click');

    $scope.addToppingForm = {};
    $scope.submitTopping = function(){
        connectHttp.postTopping($scope.addToppingForm)
            .then(function(response){
                if(response.status === 200){
                    init();
                    angular.element('#addTopping').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('Added successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };

    angular.element('#updateSizeModal').trigger('click');

    $scope.updateItem = function(val){
       $scope.updateForm = val;
    };

    $scope.sizeObject = {};
    $scope.updateSize = function(id){
        $scope.sizeObject = {"name" : $scope.updateForm.name , "price" : $scope.updateForm.price};
        connectHttp.putSize(id, $scope.sizeObject)
            .then(function(response){
                if(response.status === 200){
                    angular.element('#updateSize').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('updated successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };

    angular.element('#updateCrustModal').trigger('click');

    $scope.crustObject = {};
    $scope.updateCrust = function(id){
        $scope.crustObject = {"name" : $scope.updateForm.name , "price" : $scope.updateForm.price};
        connectHttp.putCrust(id, $scope.crustObject)
            .then(function(response){
                if(response.status === 200){
                    angular.element('#updateCrust').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('updated successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };

    angular.element('#updateCheeseModal').trigger('click');

    $scope.cheeseObject = {};
    $scope.updateCheese = function(id){
        $scope.cheeseObject = {"name" : $scope.updateForm.name , "price" : $scope.updateForm.price};
        connectHttp.putCheese(id, $scope.cheeseObject)
            .then(function(response){
                if(response.status === 200){
                    angular.element('#updateCheese').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('updated successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };

    angular.element('#updateMeatModal').trigger('click');

    $scope.meatObject = {};
    $scope.updateMeat = function(id){
        $scope.meatObject = {"name" : $scope.updateForm.name , "value":$scope.updateForm.value, "price" : $scope.updateForm.price};
        connectHttp.putMeat(id, $scope.meatObject)
            .then(function(response){
                if(response.status === 200){
                    angular.element('#updateMeat').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('updated successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };

    angular.element('#updateVeggieModal').trigger('click');

    $scope.veggieObject = {};
    $scope.updateVeggie = function(id){
        $scope.veggieObject = {"name" : $scope.updateForm.name , "value":$scope.updateForm.value, "price" : $scope.updateForm.price};
        connectHttp.putVeggie(id, $scope.veggieObject)
            .then(function(response){
                if(response.status === 200){
                    angular.element('#updateVeggie').modal('hide');
                    angular.element('body').removeClass('modal-open');
                    angular.element('.modal-backdrop').remove();
                    toastr.success('updated successfully!!!');
                }
                else {
                    toastr.error('Something is Wrong!!!');
                }
            })
    };
}]);
