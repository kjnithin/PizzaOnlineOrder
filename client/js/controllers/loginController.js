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

    }

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
              })
            }
         },
         'approvalprompt' : 'force',
         'scope' : 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read'
       };

       gapi.auth.signIn(params);
    }
}]);