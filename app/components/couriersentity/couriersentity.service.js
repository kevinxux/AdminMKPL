(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('CouriersEntityService', CouriersEntityService);

    /* @ngInject */
    function CouriersEntityService(BASE_PATH, $http) {

        var ALL = "CourierxEmpresa/ObtenerCourierxEmpresas/";
        var EDIT = "CourierxEmpresa/ModificarCourierxEmpresa";
        var SAVE = "CourierxEmpresa/NuevaCourierxEmpresa";
        var REMOVE = "CourierxEmpresa/EliminarCourierxEmpresa";
        var TYPES = "TipoCourier/ObtenerTipoCouriers";

        var service = {
            findAll: findAll,
            put: put,
            save: save,
            remove: remove,
            types:types
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
                +   "/" +   data.idCourierxEmpresa
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

        function types() {
            return $http.get(BASE_PATH + TYPES)
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