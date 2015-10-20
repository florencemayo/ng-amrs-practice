/* global angular */
(function() {

  'use strict';
    var app = angular.module('app.formentry')
             .factory('locationsFactory', locationsFactory);

             //use a factory
             function locationsFactory() 
                        {
                          //DEFAULT SELECT OPTIONS
                          var locationList = [
                                               {
                                                     "name": "Dar es Salaam",
                                                     "value":"dar es Salaam"
                                               },
                                               {
                                                    "name":"Kilimanjaro",
                                                    "value":"kilimanjaro"
                                                }
                                              ];

                            function getLocationsList() {
                                return locationList;
                            }

                            return {
                                 getLocations: getLocationsList
                            }
                            
                            //FUNCTION TO RETREIVE OPENRNMRS LOCATIONS
                            //see example clinical dashboard.html and clinical dashboard controller
                            function findlocations($scope, OpenmrsRestService, LocationModel) {
                  
                            var locationService = OpenmrsRestService.getLocationResService();
                            
                            $scope.locations = [];
                            
                            activate();
                            function activate() {
                              fetchLocations();
                            }
                            function fetchLocations() {
                              $scope.isBusy = true;
                              locationService.getLocations(onGetLocationsSuccess, onGetLocationsError, false);
                            }
                            function onGetLocationsSuccess(locations) {
                              //$scope.isBusy = false;
                              //$scope.locations = wrapLocations(locations);
                            }
                            function onGetLocationsError(error) {
                                //  $scope.isBusy = false;
                            }
                            function wrapLocations(locations) {
                                    var wrappedLocations = [];
                                    for (var i = 0; i < locations.length; i++) {
                                        wrappedLocations.push(wrapLocation(locations[i]));
                                    }
                                    return wrappedLocations;
                                }
                            function wrapLocation(location) {
                                    return LocationModel.toWrapper(location);
                                }
                            
                            //DEFAULT 2 SELECT OPTIONS
                            //NOT WORKING AS WELL
                            //IGNORE THIS
                            var loc = [
                                        {
                                          "name":"dar","value":"Dar es salaam"
                                        }
                                      ];
                            function getLList() {
                                         return loc;
                                      }

                            return {
                                     getL1 : getLList
                                    }
                                    
                         } 
                        /*//print names of location
                        return {
                                 getLLocations: findlocations.getL1()
                            }*/
                       }
                
       app.run(function (formlyConfig,locationsFactory) {
            formlyConfig.setType({
             name: 'openmrslocationselect',
            extends: 'select',
            defaultOptions: {
              templateOptions:{
                label:"Locations ha haa",
                //DEFAULT 1 WORKS
                //BUT WHAT I REALLY WANT IS TO INSERT LOCATIONS IN THIS "options"
                //SEE the above FUNCTION "findlocations" JUST LIKE IN CLINICAL DASHBOARD CONTROLLER
                options: locationsFactory.getLocations()
                //DEFAULT 2 NOT WORKING, IGNORE THIS
                //options: locationsFactory.findlocations().getL1()

                }
              }
            });
            });
})();

