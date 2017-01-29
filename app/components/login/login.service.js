(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('LoginService', LoginService);

    /* @ngInject */
    function LoginService(BASE_PATH, $http) {

        var LOGIN = "Parametro/IniciarSesionEmpresa";

        var service = {
            login: login
        };
        return service;

        ////////////////

        function login(data) {
            var body = {
                usuario: data.mail,
                contrasenia: data.password                
            }

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
    }
})();