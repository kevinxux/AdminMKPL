(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('PasswordService', PasswordService);

    /* @ngInject */
    function PasswordService(BASE_PATH, $http) {
        	
        var SET_PASSWORD = "Usuario/HabilitarUsuario";

        var service = {
            setPassword: setPassword
        };

        return service;

        ////////////////

        function setPassword(data) {

        	var body = {
        		contrasenia: data.password,
        		token: data.token      		
        	}

        	return $http.post(BASE_PATH+SET_PASSWORD, body)
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