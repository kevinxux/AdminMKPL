(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('RegisterService', RegisterService);

    /* @ngInject */
    function RegisterService(BASE_PATH, $http) {

        var NEW_USER_URL = "Usuario/NuevoUsuarioCliente";
    	var DOC_TYPES = "Combo/ListarTipoDocumento";

        var service = {
        	postNewUser: postNewUser,
            documentTypes: documentTypes
        };

        return service;

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

        function postNewUser(user) {
        	var body = {
        		correo: user.mail,
        		nombres: user.name,
        		apellidoPaterno: user.lastName, 
                idTipoDocumento: user.documentId,
                numeroDocumento: user.documentNumber       		
        	}

        	return $http.post(BASE_PATH+NEW_USER_URL, body)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        };

    };

})();