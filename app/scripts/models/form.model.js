/* global angular */
/* jshint -W003, -W098, -W117, -W026, -W040 */
(function() {
  'use strict';

  angular
        .module('models')
        .factory('FormModel', factory);

  factory.$inject = [];

  function factory() {
    var form = {
      form: Form
    };
    return form;

   //Constructor
   function Form(openmrsForm){
    var modelDefinition = this;
    var _uuid =      openmrsForm.uuid || '';
    var _name =      openmrsForm.name || '';
    var _version =   openmrsForm.version || '';
    var _build =     openmrsForm.build || 0;
    var _published =     openmrsForm.published || '';
    var _description =     openmrsForm.description || '';

      modelDefinition.uuid = function(value) {
        if (angular.isDefined(value)) {
          _uuid = value;
        } else {
          return _uuid;
        }
      };

       modelDefinition.name = function(value) {
        if (angular.isDefined(value)) {
          _name = value;
        } else {
          return _name;
        }
      };

        modelDefinition.version = function(value) {
        if (angular.isDefined(value)) {
          _version = value;
        } else {
          return _version;
        }
      };

         modelDefinition.build = function(value) {
        if (angular.isDefined(value)) {
          _build  = value;
        } else {
          return _build ;
        }
      };

         modelDefinition.published = function(value) {
        if (angular.isDefined(value)) {
          _published  = value;
        } else {
          return _published ;
        }
      };

         modelDefinition.description = function(value) {
        if (angular.isDefined(value)) {
          _description  = value;
        } else {
          return _description ;
        }
      };

        modelDefinition.openmrsModel = function(value){
        return {
          uuid:_uuid,
          name: _name,
          build:_build,
          version: _version,
          published:_published,
          description:_description


        };
      };






   }

  }
})();
