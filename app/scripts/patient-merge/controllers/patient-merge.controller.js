/*jshint -W003, -W098, -W033 */
(function () {
  'use strict';

 angular
   .module('app.patientmerge',[])
   .controller('PatientMergeCtrl',PatientMergeCtrl);

   PatientMergeCtrl.$inject = ['$scope'];


    function PatientMergeCtrl($scope) {
                        $scope.PatientMerge=[
                                {
                                  form: {
                                    options: {},
                                    model: {},
                                    fields: [
                                        {
                                            key: 'section_1',
                                            type: 'section',
                                            templateOptions: {
                                              label: 'Date'
                                            },
                                            data: {
                                              fields: [
                                                  {
                                                    key: 'encounterDate',
                                                    type: 'datetimepicker',
                                                    defaultValue: parseDate(new Date()),
                                                    templateOptions: {
                                                      type: 'text',
                                                      label: 'Date',
                                                      // datepickerPopup: 'dd-MMM-yyyy HH:mm:ss'
                                                    }
                                                }
                                              ]
                                          }
                                        },
                                      
                                    ]
                                  }
                                }
                            ];
                  //$scope.submit=function($v){}
          }
})();