app.service('connectHttp', ['$http', function ($http) {
    var baseUrl = 'https://agile-hollows-91136.herokuapp.com';
    // var baseUrl = 'http://localhost:3000';

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

    this.getCrust = function () {
        return $http.get(baseUrl + '/crusts');
    };

    this.deleteCrust = function (val) {
        return $http.delete(baseUrl + '/crusts/' + val);
    };

    this.getCheese = function () {
        return $http.get(baseUrl + '/cheeses');
    };

    this.deleteCheese = function (val) {
        return $http.delete(baseUrl + '/cheeses/' + val);
    };

    this.getSize = function () {
        return $http.get(baseUrl + '/sizes');
    };

    this.deleteSize = function (val) {
        return $http.delete(baseUrl + '/sizes/' + val);
    };

    this.getTopping = function () {
        return $http.get(baseUrl + '/toppings');
    };

    this.deleteToppings = function (val) {
        return $http.delete(baseUrl + '/toppings/' + val);
    };

}]);
