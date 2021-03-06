(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('ComboController', ComboController);

    /* @ngInject */
    function ComboController(Util, ComboService, Jager, store) {
        var vm = this;
        Util.active('combo');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');
        vm.combo = {};
        vm.prod = {};
        vm.combo.detalles = [];

        findAll();
        function findAll() {                              
	        ComboService.findAll(window.atob(token))
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.combos = res.data;
	                } else {
	                	console.error(res.data);
	                }
	            })            
        };

        fillProducts();
        function fillProducts() {
            ComboService.getProducts(window.atob(token))
                .then(function(res) {
                    if (res.status === 200) {
                        vm.products = res.data;
                    } else {
                        console.error(res.data);
                    }
                })         
        }

        vm.addProduct = function() {
            vm.combo.detalles.push({});
        }

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        }
        vm.showdelete = function(){
            return editing;
        }
        vm.preEdit = function(combo) {
            editing = true;
            vm.combo = JSON.parse(JSON.stringify(combo));
            vm.open();
        }
        vm.remove = function(){
            isProcessing = true;
            vm.combo.token = window.atob(token);
            ComboService.remove(vm.combo)
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
                vm.combo.token = window.atob(token);
                ComboService.put(vm.combo)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el combo.");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            } else {
                var body = {
                    precioMin: vm.combo.precioMin,
                    precioMax: vm.combo.precioMax,
                    precioLista: vm.combo.precioLista,
                    detalle: vm.combo.detalles,
                    token: window.atob(token),
                };
                ComboService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado el combo");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            }            
        }

        vm.open = function() {
            $("#modal-combo").modal("show");      
        }

        vm.close = function() {
            editing = false;
            vm.combo = {};
            $("#modal-combo").modal("hide");    
        }

    };

})();