(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('ProfileService', ProfileService);

    /* @ngInject */
    function ProfileService(BASE_PATH, $http) {

        var ALL_PROFILES = "Perfil/ObtenerPerfilEs";
        var EDIT = "Perfil/ModificarPerfil";
        var SAVE = "Perfil/NuevaPerfil";

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
           return $http.get(BASE_PATH + ALL_PROFILES)
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