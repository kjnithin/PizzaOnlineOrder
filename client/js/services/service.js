app.service('connectHttp', ['$http', function($http){
  var baseUrl = 'http://localhost:3000';

  this.logoutHttp = function(){
    return $http.get(baseUrl+'/logout');
  };

  this.provinceHttp = function(){
    return $http.get(baseUrl+'/provinces');
  };

  this.loginHttp = function(val){
     return $http.post(baseUrl+'/login',val);
  };

  this.registerHttp = function(val){
    return $http.post(baseUrl+'/users',val);
  };

  this.getAllUser = function(){
    return $http.get(baseUrl+'/users');
  };

  this.deleteUser = function(val){
    return $http.delete(baseUrl+'/users/'+val);
  };

  this.googleAuth = function(val){
    return $http.post(baseUrl+'/auth',val);
  };

}]);
