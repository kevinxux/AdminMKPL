(function () {
    'use strict';

    angular
        .module('marketplace')
        .factory('AdminService', AdminService);

    /* @ngInject */
    function AdminService(BASE_PATH, $http) {

        var UPDATEPASS = "Usuario/CambiarContraseniaUsuarioSS";

        var service = {
            cambiarContrasena: cambiarContrasena
        };
        return service;

        ////////////////

        function cambiarContrasena(data) {
            return $http.post(BASE_PATH + UPDATEPASS , data)
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