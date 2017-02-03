(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('EntityService', EntityService);

    /* @ngInject */
    function EntityService(BASE_PATH, $http) {
        var ALL_TYPES = "TipoCombinacion/ObtenerTipoCombinaciones";
        var EDIT = "TipoCombinacion/ModificarTipoCombinacion";
        var SAVE = "TipoCombinacion/NuevaTipoCombinacion";
        var REMOVE = "TipoCombinacion/EliminarTipoCombinacion";

        var service = {
            findAll: findAll,
            put: put,
            save: save,
            remove: remove
        };
        return service;

        ////////////////

        function save(data) {
            return $http.post(BASE_PATH + SAVE, data)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

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
           return $http.get(BASE_PATH + ALL_TYPES)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }
        function remove(data)
        {
            return $http.delete(BASE_PATH + REMOVE
                    +   "/" +   data.idTipoCombinacion
                    +   "/" +   data.token)
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