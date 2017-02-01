(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('CourierController', CourierController);

    /* @ngInject */
    function CourierController(Util, CourierService, Jager, store) {
        var vm = this;
        Util.active('couriers');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {                              
	        CourierService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.couriers = res.data;
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

        vm.preEdit = function(courier) {
            editing = true;
            vm.courier = JSON.parse(JSON.stringify(courier));
            vm.open();
        }

        vm.remove = function(){
            isProcessing = true;
            vm.courier.token = window.atob(token);
            CourierService.remove(vm.courier)
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
                vm.courier.token = window.atob(token);
                CourierService.put(vm.courier)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el tipo de courier");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            } else {
            
                var body = {
                    descripcion: vm.courier.descripcion,
                    token: window.atob(token)
                }

                CourierService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado el tipo de courier");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            }            
        }

        vm.open = function() {
            $("#modal-courier").modal("show");
        }

        vm.close = function() {
            editing = false;
            vm.courier = {};
            $("#modal-courier").modal("hide");
        }

    };

})();