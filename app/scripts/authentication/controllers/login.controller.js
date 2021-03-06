/*jshint -W003, -W117, -W098 */
(function() {
'use strict';
angular
        .module('app.authentication')
        .controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$scope', 'OpenmrsRestService', '$timeout', '$log', '$state'];

function LoginCtrl($scope, OpenmrsRestService, $timeout) {
  $scope.errors = '';
  $scope.isVisible = false;
  $scope.CurrentUser = {username:'',
              password:''
  };

  $scope.isBusy = false;


  $timeout(function () {
    $scope.authenticate = function() {
      //to do authenticate
      //console.log('you clicked me');
      $scope.isBusy = true;
      OpenmrsRestService.getAuthService().isAuthenticated($scope.CurrentUser, function(authenticated) {
        console.log(authenticated);
        $scope.isBusy = false;
        if (!authenticated) // check if user is authenticated
        {
          $scope.isVisible = true;
          $scope.errors = 'Invalid user name or password. Please try again';
        }
        else {
            OpenmrsRestService.getUserService().getUser({q:$scope.CurrentUser.username},function(data){
            console.log('Logged in user:',data);


          });
        }

      }); // authenticate user
      //if ()

    };

  }, 1000);
}
})();
