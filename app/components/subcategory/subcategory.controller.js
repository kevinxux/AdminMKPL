(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('SubcategoryController', SubcategoryController);

    /* @ngInject */
    function SubcategoryController(Util, SubcategoryService, Jager, store) {
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

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        }
        vm.showdelete = function(){
            return editing;
        }
        vm.preEdit = function(category) {
            editing = true;
            vm.category = JSON.parse(JSON.stringify(category));
            vm.open();
        }
        vm.remove = function(){
            isProcessing = true;
            vm.category.token = window.atob(token);
            CategoryService.remove(vm.category)
                .then(function(res) {
                    isProcessing = false;
                    if (res.status === 200) {
                        Jager.success(res.data);
                        findAll();
                    } else {
                        Jager.error(res.data);
                    }
                    vm.close();
                });

        }
        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.category.token = window.atob(token);
                CategoryService.put(vm.category)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente la categoría");
                            findAll();
                        } else {
                            Jager.error(res.data);
                        }
                        vm.close();
                    });
            } else {

                var body = {
                    descripcion: vm.category.descripcion,
                    icono: vm.category.icono,
                    token: window.atob(token)
                }

                CategoryService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado la categoría");
                            findAll();
                        } else {
                            Jager.error(res.data);
                        }
                        vm.close();
                    });
            }
        }

        vm.open = function() {
            $("#modal-category").modal("show");
        }

        vm.close = function() {
            editing = false;
            vm.category = {};
            $("#modal-category").modal("hide");
        }

    };

})();