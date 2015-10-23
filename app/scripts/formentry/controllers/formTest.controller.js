/*
 jshint -W003, -W098, -W117, -W109
 */
(function() {
  'use strict';

  angular
    .module('app.formentry')
    .controller('FormTestCtrl', FormTestCtrl);

  FormTestCtrl.$inject = [
  '$rootScope', 'OpenmrsRestService', '$scope', '$log'
  //, 'filterFilter'
  , '$state'
  ];

  function FormTestCtrl(
    $rootScope, OpenmrsRestService, $scope, $log
    //, filterFilter
    ,$state
    ) {
    //$scope.filter = "";
    $scope.forms = [];

    $scope.isBusy = false;
    // pagination controls

    //$scope.currentPage = 1;
    //$scope.entryLimit = 10; // items per page
    //$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

    $scope.$watch('searchString', function (searchString) {
      $scope.forms = [];
      if (searchString && searchString.length > 2) {
        $scope.isBusy = true;
        OpenmrsRestService.getFormResService().getFormQuery({q:searchString},
          function(data) {
            $scope.isBusy = false;
            $scope.forms = data;
            $scope.totalItems = $scope.forms.length;
            //$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            //$scope.currentPage = 1;
          }
        );
      }
    });

    $scope.loadForm = function (formUuid){
      /*
       Get the selected patient and save the details in the root scope
       so that we don't do another round trip to get the patient details
       */
      $rootScope.broadcastForm = _.find($scope.forms, function(form){
        if(form.uuid() === formUuid)
        {return form;}
      });
      $state.go('form', {uuid:formUuid});
    };

   // $scope.pageChanged = function() {
   //$log.log('Page changed to: ' + $scope.currentPage);
   // };

    $scope.items = [];
    // create empty search model (object) to trigger $watch on update
    $scope.search = {};
    //$scope.resetFilters = function () {
      // needs to be a function or it won't trigger a $watch
     // $scope.search = {};
    //};
  }
})();
