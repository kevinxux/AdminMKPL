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
        var UBIGEO = "Combo/ListarUbigeo";
        var USER_ADMIN_INFO = "Usuario/ObtenerDataAdministrador";
        var ASSIGN = "Usuario/NuevoUsuarioAdministradorEmpresa";
        var UNASSIGN = "Usuario/DesasignarUsuarioAdministradorEmpresa";

        var service = {
            findAll: findAll,
            put: put,
            save: save,
            documentTypes: documentTypes,
            entityTypes: entityTypes,
            ubigeo: ubigeo,
            findAdminUser: findAdminUser,
            assign: assign,
            unassign: unassign
        };
        return service;

        ////////////////

         function unassign(data) {
            return $http.post(BASE_PATH + UNASSIGN, data)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function assign(data) {
            return $http.post(BASE_PATH + ASSIGN, data)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function findAdminUser(token, entidad) {
            return $http.get(BASE_PATH + USER_ADMIN_INFO + "/" + window.atob(token) + "/" +
                             entidad)
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

        function findAll(token) {
           return $http.get(BASE_PATH + ALL_BUSINESS+ "/" + window.atob(token))
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