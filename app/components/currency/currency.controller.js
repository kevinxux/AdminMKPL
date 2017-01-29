(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('CurrencyController', CurrencyController);

    /* @ngInject */
    function CurrencyController(Util, CurrencyService, Jager, store) {
        var vm = this;
        Util.active('currency');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {                              
	        CurrencyService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.currencies = res.data;
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

        vm.preEdit = function(currency) {
            editing = true;
            vm.currency = JSON.parse(JSON.stringify(currency));
            vm.open();
        }

        vm.remove = function(){
            isProcessing = true;
            vm.currency.token = window.atob(token);
            CurrencyService.remove(vm.currency)
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
                vm.currency.token = window.atob(token);
                CurrencyService.put(vm.currency)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente la moneda");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            } else {
            
                var body = {
                    descripcion: vm.currency.descripcion,
                    codigoISO: vm.currency.codigoISO,
                    simbolo: vm.currency.simbolo,
                    token: window.atob(token)
                }

                CurrencyService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado la moneda");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            }            
        }

        vm.open = function() {
            $("#modal-currency").modal("show");            
        }

        vm.close = function() {
            editing = false;
            vm.currency = {};
            $("#modal-currency").modal("hide");
        }

    };

})();