(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('EntityService', EntityService);

    /* @ngInject */
    function EntityService(BASE_PATH, $http) {
        var GET = "Entidad/ObtenerEntidadporID";
        var EDIT = "Entidad/ModificarEntidadAdministrador";
        var IMAGE = "Entidad/EnviarImagenEntidad";
        var UBIGEO = "Combo/ListarUbigeo";

        var service = {
            get: get,
            put: put,
            image: image,
            ubigeo: ubigeo     
        };

        return service;

        ////////////////
        //  GET /api/Entidad/ObtenerEntidadporID/{token}                        
        // /api/Entidad/ModificarEntidadAdministrador                        
        // /api/Entidad/EnviarImagenEntidad
        
        function get(token) {
            return $http.get(BASE_PATH + GET + "/" + token)
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

        function image(data) {
            var fd = new FormData();
            fd.append('banner', data.banner);
            fd.append('logo',data.logo);
            fd.append('token',data.token);

            return $http.put(BASE_PATH + IMAGE, fd,
             {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
             })
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
    }
})();