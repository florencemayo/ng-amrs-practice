/* global angular */
(function() {

  'use strict';
    var app = angular
        .module('app.formentry')
        .factory('locationFactory',locationFactory)
         .controller('openMrsLocationSelectCtrl', openMrsLocationSelectCtrl);


        //locationFactory.$inject=['$scope'];

            
            //THIS IS AN EXAMPLE TO SHOW ON THE SELECT OPTION
            function locationFactory() {
            function getLocations() {
                return [
                    {
                        "name": "Dar",
                        "value":"Dar es Salaam"
                    },
                       {
                        "name":"Klm",
                        "value":"Moshi"
                    }
                ];
            }

            return {
                getLocations: getLocations
            }
        }
    
    //took THIS FROM patient dashboard for getting locations
    openMrsLocationSelectCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'OpenmrsRestService', 'LocationModel'];

    function openMrsLocationSelectCtrl($rootScope, $scope, $stateParams, OpenmrsRestService, LocationModel) {

    var locationService = OpenmrsRestService.getLocationResService();

    $scope.locations = [];
    
    //$scope.isBusy = false;
 
    activate();
    

    function activate() {
      fetchLocations();
    }
   
    function fetchLocations() {
      //$scope.isBusy = true;
      locationService.getLocations(onGetLocationsSuccess, onGetLocationsError, false);
    }


    function onGetLocationsSuccess(locations) {
      //$scope.isBusy = false;
      $scope.locations = wrapLocations(locations);
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

     //function to print name of locations
     function printLocation(locations){
       for (var i = 0; i < locations.length; i++) 
            return locations[i].name();
     }

    }


     //after retrieving locations and now set type

      app.run(function (formlyConfig,locationFactory) {
      formlyConfig.setType({
      name: 'openmrslocationselect',
      extends: 'select',
      defaultOptions: {
        templateOptions:{
          label:"Locations ha haa",
          options: locationFactory.getLocations()
           }
        }
    });
});



})();

