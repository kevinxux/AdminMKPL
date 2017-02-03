(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('SubcategoryController', SubcategoryController);

    /* @ngInject */
    function SubcategoryController(Util, SubcategoryService, Jager, store, CategoryService) {
        var vm = this;
        Util.active('subCategories');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {
            CategoryService.findAll()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.categories = res.data;
                    } else {
                        console.error(res.data);
                    }
                })
        };

        vm.getSubcategories = function () {
            SubcategoryService.findAll(vm.categorySelect)
                .then(function (res) {
                    if (res.status === 200) {
                        vm.subcategories = res.data;
                    } else {
                        console.error(res.data);
                    }
                });
        };

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        };
        vm.showdelete = function(){
            return editing;
        };
        vm.preEdit = function(subcategory) {
            editing = true;
            vm.subcategory = JSON.parse(JSON.stringify(subcategory));
            vm.open();
        };
        vm.remove = function(){
            isProcessing = true;
            vm.subcategory.token = window.atob(token);
            vm.subcategory.idCategoriaProducto = vm.categorySelect;

            SubcategoryService.remove(vm.subcategory)
                .then(function(res) {
                    isProcessing = false;
                    if (res.status === 200) {
                        Jager.success(res.data);
                        vm.getSubcategories();
                        vm.close();
                    } else {
                        Jager.error(res.data);
                    }
                });

        };
        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.subcategory.token = window.atob(token);
                vm.subcategory.idCategoriaProducto = vm.categorySelect;
                SubcategoryService.put(vm.subcategory)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente la Subcategoría");
                            vm.getSubcategories();
                            vm.close();
                        } else {
                            Jager.error(res.data);
                        }
                    });
            } else {
                if(vm.categorySelect) {

                    var body = {
                        idCategoriaProducto: vm.categorySelect,
                        descripcion: vm.subcategory.descripcion,
                        token: window.atob(token)
                    };
                    SubcategoryService.save(body)
                        .then(function(res) {
                            isProcessing = false;
                            if (res.status === 200) {
                                Jager.success("Se ha registrado la Subcategoría");
                                vm.getSubcategories();
                                vm.close();
                            } else {
                                Jager.error(res.data);
                            }
                        });
                }else{
                    Jager.error("No ha seleccionado una categoria");
                }
            }
        };

        vm.open = function() {
            $("#modal-subcategory").modal("show");
        };

        vm.close = function() {
            editing = false;
            vm.subcategory = {};
            $("#modal-subcategory").modal("hide");
        };

    };

})();