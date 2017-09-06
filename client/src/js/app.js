
var app = angular.module('pizzaOrder', [
    'ui.router',
    'toastr',
    'ngMaterial',
    'ngStorage',
    'ui.bootstrap'
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
            templateUrl: 'views/Register.html'
        })

        .state('register.step1', {
            url: '/',
            templateUrl: 'views/registerViews/step1.html',
            hideLogoutIcon:true
        })

        .state('register.step2', {
            url: '/',
            templateUrl: 'views/registerViews/step2.html',
            hideLogoutIcon:true
        })

        .state('register.step3', {
            url: '/',
            templateUrl: 'views/registerViews/step3.html',
            hideLogoutIcon:true
        })

        .state('register.step4', {
            url: '/',
            templateUrl: 'views/registerViews/step4.html',
            hideLogoutIcon:true
        })

        .state('register.step5', {
            url: '/',
            templateUrl: 'views/registerViews/step5.html',
            hideLogoutIcon:true
        })

        .state('dashboard',{
            url:'/Conestoga_Pizza/Dashboard',
            abstrat:true,
            templateUrl:'views/dashboard.html'
        })

        .state('dashboard.admin',{
          url:'/Admin/:userId',
          controller:'dashboardController',
          templateUrl:'views/dashboardViews/adminDashboard.html'
        })

        .state('dashboard.user',{
          url:'/User/:userId',
          controller:'dashboardController',
          templateUrl:'views/dashboardViews/userDashboard.html'
        })

        .state('store',{
            url:'/Conestoga_Pizza/Store',
            templateUrl:'views/store.html'
        })

        .state('items',{
            url:'/:storeName/:storeId',
            abstrat:true,
            templateUrl:'views/createItem.html'
        })

        .state('items.crust',{
          url:'/Crust',
          controller:'createItemController',
          templateUrl:'views/itemViews/crustForm.html'
        })

        .state('items.size',{
          url:'/Size',
          controller:'createItemController',
          templateUrl:'views/itemViews/sizeForm.html'
        })

        .state('items.cheese',{
          url:'/Cheese',
          controller:'createItemController',
          templateUrl:'views/itemViews/cheeseForm.html'
        })

        .state('items.topping',{
          url:'/Topping',
          controller:'createItemController',
          templateUrl:'views/itemViews/toppingForm.html'
        })

        .state('admin', {
            url: '/Conestoga_Pizza/Admin',
            abstract: true,
            templateUrl: 'views/admin.html',
        })

        .state('admin.order', {
            url: '/Store/:storeId/Order',
            templateUrl: 'views/adminViews/admin_order.html'
        })

        .state('admin.inventory', {
            url: '/Store/:storeId/Inventory',
            templateUrl: 'views/adminViews/admin_inventory.html'
            })

        .state('admin.user', {
            url: '/Store/:storeId/UserDetails',
            templateUrl: 'views/adminViews/admin_userDetails.html'
        })

        .state('admin.personal', {
            url: '/Store/:storeId/AdminDetails',
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
            url: '/Conestoga_Pizza/User',
            abstract: true,
            templateUrl: 'views/user.html'
        })

        .state('user.history', {
            url: '/:storeName/History?:storeId&:userId',
            templateUrl: 'views/userViews/user_history.html'
        })

        .state('user.details', {
            url: '/:storeName/Details?:storeId&:userId',
            views: {
                '': {
                    templateUrl: 'views/userViews/user_details.html'
                },
                'left@user.details': {
                    templateUrl: 'views/userViews/userDetails/userDetailsLeft.html'
                },
                'right@user.details': {
                    templateUrl: 'views/userViews/userDetails/userDetailsRight.html'
                }
            }
        })

        .state('user.order', {
            url: '/:storeName/:storeId/Order',
            views: {
                '': {
                    templateUrl: 'views/userViews/user_order.html'
                },
                'left@user.order': {
                    templateUrl: 'views/userViews/userOrder/userOrderLeft.html'
                },
                'right@user.order': {
                    templateUrl: 'views/userViews/userOrder/userOrderRight.html'
                }
            }
        });
}]);
