(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('EstablishmentService', EstablishmentService);

    /* @ngInject */
    function EstablishmentService(BASE_PATH, $http) {

        var ALL = "Establecimiento/ObtenerEstablecimientosporEntidad/";
        var EDIT = "Establecimiento/ModificarEstablecimiento";
        var SAVE = "Establecimiento/NuevaEstablecimiento";
        var REMOVE = "Establecimiento/EliminarEstablecimiento";
        var UBIGEO = "Combo/ListarUbigeo";

        var service = {
            findAll: findAll,
            put: put,
            save: save,
            remove: remove,
            ubigeo: ubigeo
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

        function findAll(token) {
            return $http.get(BASE_PATH + ALL + token)
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
                +   "/" +   data.token
                +   "/" +   data.idEstablecimiento)
                .then(getCallResponse)
                .catch(getCallError);
            function getCallResponse(response) {
                return response;
            }
            function getCallError(error) {
                return error;
            }
        }

        function ubigeo() {
            return $http.get(BASE_PATH + UBIGEO)
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