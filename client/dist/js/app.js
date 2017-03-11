
var app = angular.module('pizzaOrder', [
    'ui.router',
    'toastr',
    'ngMaterial'
]);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Login');

    $stateProvider

        .state('login', {
            url: '/Login',
            templateUrl: 'views/login.html',
        })

        .state('register', {
            url: '/Register',
            templateUrl: 'views/register.html',
        })

        .state('register.step1', {
            url: '/',
            templateUrl: 'views/registerViews/step1.html'
        })

        .state('register.step2', {
            url: '/',
            templateUrl: 'views/registerViews/step2.html'
        })

        .state('register.step3', {
            url: '/',
            templateUrl: 'views/registerViews/step3.html'
        })

        .state('register.step4', {
            url: '/',
            templateUrl: 'views/registerViews/step4.html'
        })

        .state('admin', {
            url: '/Admin',
            abstract: true,
            templateUrl: 'views/admin.html',
        })

        .state('admin.order', {
            url: '/Order',
            templateUrl: 'views/adminViews/admin_order.html'
        })

        .state('admin.inventory', {
            url: '/Inventory',
            templateUrl: 'views/adminViews/admin_inventory.html'
        })

        .state('admin.user', {
            url: '/UserDetails',
            templateUrl: 'views/adminViews/admin_userDetails.html'
        })

        .state('admin.personal', {
            url: '/AdminDetails',
            views:{
              '': {
                templateUrl: 'views/adminViews/admin_personalDetails.html'
              },
              'right@admin.personal':{
                templateUrl:'views/adminViews/adminPersonalDetails/right.html'
            },
              'left@admin.personal':{
              templateUrl:'views/adminViews/adminPersonalDetails/left.html'
            }
          }
        })

        .state('user', {
            url: '/User',
            abstract: true,
            templateUrl: 'views/user.html'
        })

        .state('user.order', {
            url: '/Order',
            templateUrl: 'views/userViews/user_order.html'
        })

        .state('user.history', {
            url: '/History',
            templateUrl: 'views/userViews/user_history.html'
        })

        .state('user.details', {
            url: '/Details',
            views: {
                '': {
                    templateUrl: 'views/userViews/user_details.html'
                },
                'left@user.details': {
                    templateUrl: 'views/userViews/UserDetails/userDetailsLeft.html'
                },
                'right@user.details': {
                    templateUrl: 'views/userViews/UserDetails/userDetailsRight.html'
                }
            }
        });
}]);

app.controller("adminController", ['$scope', 'connectHttp', function($scope, connectHttp) {

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
            $scope.user = userDetails;
            $scope.personal = personalDetails;
        });

    $scope.demo = {
        showTooltip: true,
        tipDirection: 'bottom'
    };

    $scope.delete = function(val) {
        connectHttp.deleteUser(val)
            .then(function(response) {

            });
    };


}]);

app.controller("displayController",['$scope', 'connectHttp', function($scope,connectHttp){

}]);

app.controller('loginController', ['$scope','toastr','connectHttp','$state','$rootScope', function($scope, toastr, connectHttp,$state,$rootScope) {
    $scope.loginForm = {};

    $scope.login = function() {
        connectHttp.loginHttp($scope.loginForm)
            .then(function(response) {
                if (response.data.user.role === "admin") {
                    $state.go('admin.order');
                } else if (response.data.user.role === "user") {
                  $state.go('user.order');
                } else {
                    $state.go('');
                }
                  toastr.success('Successfully Logged In!!');
            }, function(response) {
                toastr.error('Invalid Credentials');
            });

    };

    $scope.go = function() {
        $state.go('register.step1');
    };

     $scope.auth={};
    $scope.signWithGoogle = function(){
       var params ={
         'clientid': '75087466487-6ij85f507k5f4ucru1tfg1mugjs6bkhh.apps.googleusercontent.com',
         'cookiepolicy' : 'single_host_origin',
         'callback': function(result){
            if(result['status']['signed_in']){
              var request = gapi.client.plus.people.get(
                {
                  'userId':'me'
                }
              );
              request.execute(function(res){
                  $scope.email = res.emails[0].value;
                  $scope.auth ={ email : $scope.email};
                  connectHttp.googleAuth($scope.auth)
                  .then(function(response){
                  if(response.data.role === "admin"){
                    $state.go('admin.order');
                        }
                    else if(response.data.role === "user"){
                      $state.go('user.order');
                    }
                    else {
                      $state.go("");
                    }
                      toastr.success('Successfully Logged In!!');
                  },
                  function(response) {
                      toastr.error('Invalid Credentials');
                });
              });
            }
         },
         'approvalprompt' : 'force',
         'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
       };

       gapi.auth.signIn(params);
    };
}]);

app.controller('logoutController',['$scope','$location','toastr','connectHttp', function($scope, $location, toastr, connectHttp) {
    $scope.logout = function() {
            connectHttp.logoutHttp()
            .then(function(response) {
                $location.path('/Login');
                toastr.success('Successfully Logged Out!!');
            }, function(response) {
                toastr.error('Please Try Again');
            });
    };
}]);

app.controller('registerController', ['$scope', '$location', 'toastr', 'connectHttp', '$state', function($scope, $location, toastr, connectHttp,$state) {
    $scope.registerForm = {};

    $scope.register = function() {
        connectHttp.registerHttp($scope.registerForm)
            .then(function(response) {
                $location.path('/Login');
                toastr.success('Successfully Registered!!');
            }, function(response) {
                toastr.error('Invalid Credentials');
            });
    };

    connectHttp.provinceHttp()
        .then(function(response) {
            $scope.provinceName = response.data;
        }, function errorCallback(response) {
            toastr.error('Invalid Credentials' + response.data.error);
        });

    $scope.backToLogin = function() {
        $state.go('login');
    };

}]);

app.controller("userController", function($scope){

});

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
