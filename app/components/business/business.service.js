(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('BusinessService', BusinessService);

    /* @ngInject */
    function BusinessService(BASE_PATH, $http) {

        var ALL_BUSINESS = "Entidad/ObtenerEntidades";
        var EDIT = "Entidad/ModificarEntidad";
        var SAVE = "Entidad/NuevaEntidad";
        var DOC_TYPES = "Combo/ListarTipoDocumento";
        var ENTITY_TYPES = "TipoEntidad/ObtenerTipoEntidades";

        var service = {
            findAll: findAll,
            put: put,
            save: save,
            documentTypes: documentTypes,
            entityTypes: entityTypes
        };
        return service;

        ////////////////

        function entityTypes() {
            return $http.get(BASE_PATH+ENTITY_TYPES)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function documentTypes() {
            return $http.post(BASE_PATH+DOC_TYPES)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

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
           return $http.get(BASE_PATH + ALL_BUSINESS)
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