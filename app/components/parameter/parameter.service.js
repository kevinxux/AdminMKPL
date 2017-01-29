(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('ParameterService', ParameterService);

    /* @ngInject */
    function ParameterService(BASE_PATH, $http) {

        var ALL_PARAMETERS = "Parametro/ObtenerParametros";
        var EDIT = "Parametro/ModificarParametro";

        var service = {
            findAll: findAll,
            put: put
        };
        return service;

        ////////////////
        function put(data) {
            return $http.put(BASE_PATH + EDIT, data)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function findAll() {
           return $http.get(BASE_PATH + ALL_PARAMETERS)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }
    }
})();