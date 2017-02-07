(function () {
    'use strict';

    angular
        .module('marketplace')
        .factory('AdminService', AdminService);

    /* @ngInject */
    function AdminService(BASE_PATH, $http) {

        var UPDATEPASS = "Usuario/CambiarContraseniaUsuarioSS";
        var GETDATA = "Usuario/ObtenerDataUsuario/";
        var PUT = "Usuario/ModificarUsuario";

        var service = {
            cambiarContrasena: cambiarContrasena,
            getDataUsuario: getDataUsuario,
            put:put
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

        function getDataUsuario(token) {
            return $http.get(BASE_PATH + GETDATA + token)
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
            return $http.put(BASE_PATH + PUT , data)
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