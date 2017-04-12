
var app = angular.module('pizzaOrder', [
    'ui.router',
    'toastr',
    'ngMaterial',
    'ngStorage',
    'ui.bootstrap.modal'
]);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/Login');

    $stateProvider

        .state('login', {
            url: '/Login',
            templateUrl: 'views/login.html',
            hideLogoutIcon:true
        })

        .state('register', {
            url: '/Register',
            templateUrl: 'views/Register.html',
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
