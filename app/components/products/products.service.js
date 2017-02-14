(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('ProductsService', ProductsService);

    /* @ngInject */
    function ProductsService(BASE_PATH, $http) {
        var ALL_PRODUCTS = "Producto/GetProductosEntidad";
        var ALL_CATEGORIES = "CategoriaProducto/ObtenerCategoriaProductos";
        var ALL_SUBCATEGORIES = "SubCategoriaProducto/ObtenerSubCategoriaProductos";
        var ALL_CURRENCIES = "Moneda/ObtenerMonedas";
        var IMAGES = "Producto/EnviarImagenProducto";
        var EDIT = "Producto/ModificarProducto";
        var SAVE = "Producto/NuevoProducto";
        var REMOVE = "Producto/EliminarProducto";

        var service = {
            findAll: findAll,
            getCategories: getCategories,
            getSubCategories: getSubCategories,
            getCurrencies: getCurrencies,
            images: images,
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

        function images(data) {
            var fd = new FormData();
            fd.append('banner', data.banner);
            fd.append('logo',data.logo);
            fd.append('token',data.token);

            return $http.put(BASE_PATH + IMAGES, fd,
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

        function findAll(token) {
           return $http.get(BASE_PATH + ALL_PRODUCTS + "/" + token)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function getCategories() {
           return $http.get(BASE_PATH + ALL_CATEGORIES )
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function getSubCategories(idCategory) {
            return $http.get(BASE_PATH + ALL_SUBCATEGORIES + "/" + idCategory)
                .then(getCallResponse)
                .catch(getCallError);

            function getCallResponse(response) {
                return response;
            }

            function getCallError(error) {
                return error;
            }
        }

        function getCurrencies() {
           return $http.get(BASE_PATH + ALL_CURRENCIES)
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