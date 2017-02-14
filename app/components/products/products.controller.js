(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('ProductsController', ProductsController);

    /* @ngInject */
    function ProductsController(Util, ProductsService, Jager, store) {
        var vm = this;
        Util.active('businessproducts');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');
        vm.product = {};


        findAll();
        function findAll() {                              
	        ProductsService.findAll(window.atob(token))
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.products = res.data;
	                } else {
	                	console.error(res.data);
	                }
	            })            
        };

        fillCategories();
        function fillCategories() {
            ProductsService.getCategories()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.categories = res.data;
                    } else {
                        console.error(res.data);
                    }
                })         
        }

        vm.fillSubCategories = function () {
            var idCategory = vm.category.idCategoriaProducto;
            vm.product.idCategoriaProducto = idCategory;
            ProductsService.getSubCategories(idCategory)
                .then(function(res) {
                    if (res.status === 200) {
                        vm.subCategories = res.data;
                    } else {
                        console.error(res.data);
                    }
                })         
        }

        fillCurrencies();
        function fillCurrencies() {
            ProductsService.getCurrencies()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.currencies = res.data;
                    } else {
                        console.error(res.data);
                    }
                })         
        }

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        }
        vm.showdelete = function(){
            return editing;
        }
        vm.preEdit = function(product) {
            editing = true;
            vm.product = JSON.parse(JSON.stringify(product));
            vm.open();
        }
        vm.remove = function(){
            isProcessing = true;
            vm.product.token = window.atob(token);
            ProductsService.remove(vm.product)
                .then(function(res) {
                    isProcessing = false;
                    if (res.status === 200) {
                        Jager.success(res.data);
                        findAll();
                        vm.close();
                    } else {
                        Jager.error(res.data);
                    }
                });

        }
        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.product.token = window.atob(token);
                ProductsService.put(vm.product)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el producto.");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            } else {
            
                var body = {
                    idCategoriaProducto: vm.product.idCategoriaProducto,
                    idSubCategoriaProducto: vm.subCategoria.idSubCategoriaProducto,
                    idMoneda: vm.moneda.idMoneda,
                    descripcion: vm.product.descripcion,
                    precioMin: vm.product.precioMin,
                    precioMax: vm.product.precioMax,
                    precioLista: vm.product.precioLista,
                    precioCosto: vm.product.precioCosto,
                    sku: vm.product.sku,
                    palabrasClave: vm.product.palabrasClave,
                    token: window.atob(token),
                }

                ProductsService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado el producto");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            }            
        }

        vm.uploadFiles = function() {
            isProcessing = true;
            var body = {
                file1: vm.entity.file1,
                file2: vm.entity.file2,
                file3: vm.entity.file3,
                file4: vm.entity.file4,
                file5: vm.entity.file5,
                token: window.atob(token)
            }
            console.log(body);
            ProductsService.images(body)
                .then(function(res) {
                    isProcessing = false;
                    if (res.status === 200) {
                        Jager.success("Se han actualizado correctamente las imagenes.");
                    } else {                            
                        Jager.error(res.data);
                    }
                });
        };

        vm.open = function() {
            $("#modal-product").modal("show");      
        }

        vm.close = function() {
            editing = false;
            vm.product = {};
            $("#modal-product").modal("hide");    
        }

    };

})();