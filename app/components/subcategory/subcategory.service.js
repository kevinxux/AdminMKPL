(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('SubcategoryService', SubcategoryService);

    /* @ngInject */
    function SubcategoryService(BASE_PATH, $http) {

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