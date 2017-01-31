(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('SubcategoryService', SubcategoryService);

    /* @ngInject */
    function SubcategoryService(BASE_PATH, $http) {

        var ALL = "SubCategoriaProducto/ObtenerSubCategoriaProductos/";
        var EDIT = "SubCategoriaProducto/ModificarSubCategoriaProducto";
        var SAVE = "SubCategoriaProducto/NuevaSubCategoriaProducto";
        var REMOVE = "SubCategoriaProducto/EliminarSubCategoriaProducto";

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

        function findAll(idCategory) {
            return $http.get(BASE_PATH + ALL + idCategory)
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
            return $http.delete(BASE_PATH + REMOVE, data)
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