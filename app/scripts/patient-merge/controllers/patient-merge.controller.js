/*jshint -W003, -W098, -W033 */
(function () {
  'use strict';

 angular
   .module('app.patientmerge')
   .controller('PatientMergeCtrl',PatientMergeCtrl);

   PatientMergeCtrl.$inject = ['$scope'];


    function PatientMergeCtrl($scope){ 
    //var vm = this;
    // The model object that we reference
    // on the  element in index.html
    //vm.user = {};
    $scope.user={};
    
    // An array of our form fields with configuration
    // and options set. We make reference to this in
    // the 'fields' attribute on the  element
    //vm.userFields 
    $scope.userFields= [
        {
            key: 'first_name',
            type: 'input',
           templateOptions: {
                type: 'text',
                label: 'First Name',
                placeholder: 'Enter your first name',
                required: true
            }
        },
        {
            key: 'last_name',
            type: 'input',
         templateOptions: {
                type: 'text',
                label: 'Last Name',
                placeholder: 'Enter your last name',
                required: true
            }

        },
        {
            key: 'email',
            type: 'input',
           templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                required: true
            }
        },
    ];
    

    }

})();