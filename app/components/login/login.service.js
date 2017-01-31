(function () {
    'use strict';

    angular
        .module('marketplace')
        .factory('LoginService', LoginService);

    /* @ngInject */
    function LoginService(BASE_PATH, $http) {

        var LOGIN = "Parametro/IniciarSesionEmpresa";
        var LOGOUT = "Parametro/CerrarSesion/";
        var RESTORE = "Usuario/SolicitarCambioContraseniaUsuario";
        var RESTOREPASS = "Usuario/CambiarContraseniaUsuario";
        var ACTIVEUSER = "Usuario/HabilitarUsuario";

        var service = {
            login: login,
            logout: logout,
            restore: restore,
            cambiarContrasena: cambiarContrasena,
            habilitarUser: habilitarUser
        };
        return service;

        ////////////////

        function login(data) {
            var body = {
                usuario: data.mail,
                contrasenia: data.password
            };

            return $http.post(BASE_PATH + LOGIN, body)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function logout(data) {
            return $http.get(BASE_PATH + LOGOUT + data)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function restore(data) {
            return $http.post(BASE_PATH + RESTORE, data)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function cambiarContrasena(data) {
            return $http.post(BASE_PATH + RESTOREPASS, data)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function habilitarUser(data) {
            return $http.post(BASE_PATH + ACTIVEUSER, data)
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