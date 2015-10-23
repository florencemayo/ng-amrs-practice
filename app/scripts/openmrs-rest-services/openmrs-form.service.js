/*jshint -W003, -W098, -W117, -W026 */
(function() {
  'use strict';

  angular
    .module('app.openmrsRestServices')
    .service('FormResService', FormResService);

  FormResService.$inject = ['OpenmrsSettings', '$resource', 'FormModel'];

  function FormResService(OpenmrsSettings, $resource, FormModel) {
    var service;
    //var currentSession;
    service = {
      getFormByUuid: getFormByUuid,
      getFormQuery: getFormQuery
    };

     function getResource() {
          var v = 'custom:(uuid,name,version,build,published,description)';
         
          var r = $resource(OpenmrsSettings.getCurrentRestUrlBase() + 'form/:uuid',
           {uuid: '@uuid', v: v},
           {query: {method: 'GET', isArray: false}}
            );
         return r;

        }
     
       function getFormByUuid(params, callback) {
        var FormRes = getResource();

        FormRes.get(params, function(data) {
          
          var p = {
                  uuid:data.uuid,
                  name: data.name,
                  version:data.version,
                  build:data.build,
                  published:data.published,
                  description:data.description
                  };
          
          console.log(p);

          var d = new FormModel.form(p);
          callback(d);
        });
      }

      function getFormQuery(params, callback) {
      var FormRes = getResource();
      var forms = [];

      FormRes.query(params, false, function(data) {
  
        angular.forEach(data.results, function(value, key) {
       
          
          var p = new FormModel.Form(value);

          forms.push(p);
      });

        callback(forms);
      });
    }

  }
})();
