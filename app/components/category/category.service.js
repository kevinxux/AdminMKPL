(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('CategoryService', CategoryService);

    /* @ngInject */
    function CategoryService(BASE_PATH, $http) {

        var ALL_CATEGORIES = "CategoriaProducto/ObtenerCategoriaProductos";
        var EDIT = "CategoriaProducto/ModificarCategoriaProducto";
        var SAVE = "CategoriaProducto/NuevaCategoriaProducto";
        var REMOVE = "CategoriaProducto/EliminarCategoriaProducto";

        var service = {
            findAll: findAll,
            put: put,
            save: save,
            remove: remove
        };
        return service;

        ////////////////

        function save(data, file) {
         var fd = new FormData();
         fd.append('banner', data.banner);
         fd.append('descripcion',data.descripcion);
         fd.append('icono',data.icono);
         fd.append('token',data.token);
            return $http.post(BASE_PATH + SAVE, fd,
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
           return $http.get(BASE_PATH + ALL_CATEGORIES)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }
        function remove(data)
        {
            return $http.delete(BASE_PATH + REMOVE
                    +   "/" +   data.idCategoriaProducto
                    +   "/" +   data.token)
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