/*
jshint -W098, -W003, -W068, -W004, -W033, -W030, -W117, -W069
*/
(function() {
    'use strict';

    angular
        .module('app.formentry')
        .controller('FormentryCtrl', FormentryCtrl);

    FormentryCtrl.$inject = ['$translate', 'dialogs', '$location', '$rootScope',  '$stateParams', '$state', '$scope', 'FormentryService', 'OpenmrsRestService', '$timeout', 'FormsMetaData'];

    function FormentryCtrl($translate, dialogs, $location, $rootScope, $stateParams, $state, $scope, FormentryService, OpenmrsRestService, $timeout, FormsMetaData) {

        $scope.vm = {};
        $scope.vm.error = '';
        $scope.vm.model = {};
        $scope.vm.patient = $rootScope.broadcastPatient;
        $scope.vm.submitLabel = 'Save'
        var formSchema;
        $scope.vm.formlyFields;
        //$scope.vm.encounters = $rootScope.encounters;

        /*
        Test logic to get either a blank form or form filled with existing data.
        */

        //8a79e511-edb1-4b9d-a94e-ab51e4f6528c
        var params={uuid: $stateParams.encuuid };
        //var params = {uuid: '18a1f142-f2c6-4419-a5db-5f875020b887'};
        var encData;
        $scope.vm.userFields = {};
        var selectedForm = $stateParams.formuuid;
        console.log('testing selected Form')
        console.log(selectedForm);

        $timeout(function () {
          // get form schema data
         //  var selectedForm = $stateParams.formuuid;
         //  console.log('testing selected Form')
         FormentryService.getFormSchema(selectedForm, function(schema){
          formSchema = schema;
          FormentryService.createForm(formSchema, function(formlySchema){
            $scope.vm.formlyFields = formlySchema;
            $scope.vm.tabs = $scope.vm.formlyFields;

            var i = 0;
            angular.forEach($scope.vm.tabs, function(tab){
              // console.log('Tab Structure');
              // console.log(tab);
              if (i===0) {tab.active = true;}
              i++;
              tab.form['model']=$scope.vm.model;
            });
            ///FormentryService.getEncounter('encData', formlySchema)
            //var params = {uuid:'cf3f041c-9c37-44c5-983a-d02507ffe279'};
            if(params.uuid !== undefined && params.uuid !== '')
            {
              OpenmrsRestService.getEncounterResService().getEncounterByUuid(params,
                function(data){
                var encData = data;
                // console.log('Rest Feeback')
                // console.log(encData);
                if (data)
                {
                  $scope.vm.submitLabel = 'Update'
                    FormentryService.getEncounter(encData,formlySchema);
                }
               });
            }
          });
         });
       },1000);


        $scope.vm.cancel = function()
        {
          console.log($state);
          var dlg = dialogs.confirm('Close Form', 'Do you want to close this form?');
					dlg.result.then(function(btn){
						$location.path($rootScope.previousState + '/' +$rootScope.previousStateParams.uuid);
					},function(btn){
						//$scope.vm.confirmed = 'You confirmed "No."';
					});

        }

        $scope.vm.submit = function() {
          //  $scope.vm.error = FormentryService.validateForm($scope.vm.userFields);
            if ($scope.vm.error === '')
            {
              //FormentryService.getPayLoad($scope.vm.userFields);
            }
            else {
              $scope.vm.error = '';
            }
            var form = FormsMetaData.getForm($stateParams.formuuid);
            console.log('Selected Form');
            console.log(form);
            var payLoad = FormentryService.updateFormPayLoad($scope.vm.model,$scope.vm.tabs, $scope.vm.patient,form);
            if (!_.isEmpty(payLoad.obs))
            {
                /*
                submit only if we have some obs
                */
                if(payLoad.encounterType !== undefined){
                  OpenmrsRestService.getEncounterResService().saveEncounter(JSON.stringify(payLoad), function(data){
                    if (data)
                    {
                      $scope.vm.success = 'Form Submitted successfully'
                      var dlg=dialogs.notify('Success', $scope.vm.success);
                      if($scope.vm.submitLabel === 'Update')
                      {
                        var obsToVoid = _.where(updatedPayLoad.obs,{voided:true});
                        console.log('Obs to Void: ', obsToVoid);
                        if(obsToVoid !== undefined)
                        {
                          _.each(obsToVoid, function(obs){
                            OpenmrsRestService.getObsResService().voidObs(obs, function(data){
                              if (data)
                              {
                                console.log('Voided Obs uuid: ', obs.uuid);
                              }
                            });
                          })
                        }
                      }

                      $location.path($rootScope.previousState + '/' +$rootScope.previousStateParams.uuid);
                    }
                  });
                }
                else {
                  //void obs only
                  if($scope.vm.submitLabel === 'Update')
                  {
                    var obsToVoid = _.where(updatedPayLoad.obs,{voided:true});
                    console.log('Obs to Void: ', obsToVoid);
                    if(obsToVoid !== undefined)
                    {
                      _.each(obsToVoid, function(obs){
                        OpenmrsRestService.getObsResService().voidObs(obs, function(data){
                          if (data)
                          {
                            console.log('Voided Obs uuid: ', obs.uuid);
                          }
                        });
                      })
                    }
                  }
                  $scope.vm.success = 'Form Submitted successfully'
                  var dlg=dialogs.notify('Success', $scope.vm.success);
                  $location.path($rootScope.previousState + '/' +$rootScope.previousStateParams.uuid);
                }
            }
            else {
                var dlg=dialogs.notify('Error', 'No data to be Submitted. Please fill the form first....');
            }


        }

//$scope.vm.userFields = $scope.vm.formlyFields;
 //console.log(JSON.stringify($scope.vm.userFields));
}

})();
