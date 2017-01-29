(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('MembershipService', MembershipService);

    /* @ngInject */
    function MembershipService(BASE_PATH, $http) {

        var ALL_CATEGORIES = "Membresia/ObtenerMembresias";
        var EDIT = "Membresia/ModificarMembresia";
        var SAVE = "Membresia/NuevaMembresia";

        var service = {
            findAll: findAll,
            put: put,
            save: save
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
           return $http.get(BASE_PATH + ALL_CATEGORIES)
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