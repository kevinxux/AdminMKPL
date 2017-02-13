(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('ComboService', ComboService);

    /* @ngInject */
    function ComboService(BASE_PATH, $http) {
        var ALL_PRODUCTS = "Producto/GetProductosEntidad";
        var ALL_COMBOS = "ComboProducto/ObtenerComboProductos";
        var EDIT = "ComboProducto/ModificarComboProducto";
        var SAVE = "ComboProducto/NuevoComboProducto";
        var REMOVE = "ComboProducto/EliminarComboProducto";

        var service = {
            findAll: findAll,
            getProducts: getProducts,
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

        function findAll(token) {
           return $http.get(BASE_PATH + ALL_COMBOS + "/" + token)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function getProducts(token) {
           return $http.get(BASE_PATH + ALL_PRODUCTS + '/' + token)
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
                    +   "/" +   data.idProducto
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