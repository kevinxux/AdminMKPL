(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('CourierService', CourierService);

    /* @ngInject */
    function CourierService(BASE_PATH, $http) {

        var ALL_COURIERS = "TipoCourier/ObtenerTipoCouriers";
        var EDIT = "TipoCourier/ModificarTipoCourier";
        var SAVE = "TipoCourier/NuevaTipoCourier";
        var REMOVE = "TipoCourier/EliminarTipoCourier";

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

        function remove(data) {
            return $http.delete(BASE_PATH + REMOVE
                                +   "/" +   data.idTipoCourier
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
        function findAll() {
           return $http.get(BASE_PATH + ALL_COURIERS)
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