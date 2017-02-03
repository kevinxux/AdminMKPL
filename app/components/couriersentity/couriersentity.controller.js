(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('CouriersEntityController', CouriersEntityController);

    /* @ngInject */
    function CouriersEntityController(Util, Jager, store, CouriersEntityService) {
        var vm = this;
        Util.active('couriersEntity');

        var editing = false;

        var isProcessing = false;

        var token = window.atob(store.get('X-MKPL-DATA'));

        findAll();
        function findAll() {
            CouriersEntityService.findAll(token)
                .then(function(res) {
                    if (res.status === 200) {
                        vm.couriersentities = res.data;
                    } else {
                        console.error(res.data);
                    }
                })
        };

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        };
        vm.showdelete = function(){
            return editing;
        };
        vm.preEdit = function(subcategory) {
            editing = true;
            vm.courierentity = JSON.parse(JSON.stringify(subcategory));
            vm.open();
        };
        vm.remove = function(){
            isProcessing = true;
            vm.courierentity.token = token;

            CouriersEntityService.remove(vm.courierentity)
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

        };
        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.courierentity.token = token;
                CouriersEntityService.put(vm.courierentity)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente la Subcategoría");
                            findAll();
                            vm.close();
                        } else {
                            Jager.error(res.data);
                        }
                    });
            } else {
                vm.courierentity.token = token;
                CouriersEntityService.save(vm.courierentity)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado correctamente el Courier");
                            findAll();
                            vm.close();
                        } else {
                            Jager.error(res.data);
                        }
                    });
            }
        };

        vm.open = function() {
            CouriersEntityService.types()
                .then(function (res) {
                    if (res.status === 200) {
                        vm.types = res.data
                    } else {
                        Jager.error(res.data);
                    }
                });
            $("#modal-courierentity").modal("show");
        };

        vm.close = function() {
            editing = false;
            vm.couriersentity = {};
            $("#modal-courierentity").modal("hide");
        };
    };

})();