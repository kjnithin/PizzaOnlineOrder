app.service('connectHttp', ['$http', function ($http) {
    // var baseUrl = 'https://agile-hollows-91136.herokuapp.com';
    var baseUrl = 'http://localhost:4000';

    this.logoutHttp = function () {
        return $http.get(baseUrl + '/logout');
    };

    this.provinceHttp = function () {
        return $http.get(baseUrl + '/provinces');
    };

    this.loginHttp = function (val) {
        return $http.post(baseUrl + '/login', val);
    };

    this.registerHttp = function (val) {
        return $http.post(baseUrl + '/users', val);
    };

    this.getAllUser = function () {
        return $http.get(baseUrl + '/users');
    };

    this.deleteUser = function (val) {
        return $http.delete(baseUrl + '/users/' + val);
    };

    this.googleAuth = function (val) {
        return $http.post(baseUrl + '/auth', val);
    };

    this.getCrust = function (val) {
        return $http.get(baseUrl + '/getcrust/'+val);
    };

    this.deleteCrust = function (val) {
        return $http.delete(baseUrl + '/crusts/' + val);
    };

    this.getCheese = function (val) {
        return $http.get(baseUrl + '/getcheese/'+val);
    };

    this.deleteCheese = function (val) {
        return $http.delete(baseUrl + '/cheeses/' + val);
    };

    this.getSize = function (val) {
        return $http.get(baseUrl + '/getsize/'+val);
    };

    this.deleteSize = function (val) {
        return $http.delete(baseUrl + '/sizes/' + val);
    };

    this.getTopping = function (val) {
        return $http.get(baseUrl + '/gettopping/'+val);
    };

    this.deleteToppings = function (val) {
        return $http.delete(baseUrl + '/toppings/' + val);
    };

    this.postSize = function(val){
        return $http.post(baseUrl+ '/sizes', val);
    };

    this.postCrust = function(val){
        return $http.post(baseUrl+ '/crusts', val);
    };

    this.postCheese = function(val){
        return $http.post(baseUrl+ '/cheeses', val);
    };

    this.postTopping = function(val){
        return $http.post(baseUrl+ '/toppings', val);
    };

    this.putSize = function(id,val){
        return $http.put(baseUrl+'/sizes/'+id, val);
    };

    this.putCrust = function(id,val){
        return $http.put(baseUrl+'/crusts/'+id, val);
    };

    this.putCheese = function(id,val){
        return $http.put(baseUrl+'/cheeses/'+id, val);
    }

    this.putVeggie = function(id,val){
        return $http.put(baseUrl+'/toppings/'+id, val);
    }

    this.putMeat = function(id,val){
        return $http.put(baseUrl+'/toppings/'+id, val);
    }

    this.putUser = function(id,val){
        return $http.put(baseUrl+'/users/'+id, val);
    }

    this.createStore = function(store){
        return $http.post(baseUrl+'/createstore',store);
    }

    this.getStores = function(id){
        return $http.get(baseUrl+'/getstore/'+id);
    }
}]);
