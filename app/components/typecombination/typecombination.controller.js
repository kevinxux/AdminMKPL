(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('TypeCombinationController', TypeCombinationController);

    /* @ngInject */
    function TypeCombinationController(Util, TypeCombinationService, Jager, store) {
        var vm = this;
        Util.active('typecombination');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {                              
	        TypeCombinationService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.typeCombinations = res.data;
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
        vm.preEdit = function(typeCombination) {
            editing = true;
            vm.typeCombination = JSON.parse(JSON.stringify(typeCombination));
            vm.open();
        }
        vm.remove = function(){
            isProcessing = true;
            vm.typeCombination.token = window.atob(token);
            TypeCombinationService.remove(vm.typeCombination)
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
                vm.typeCombination.token = window.atob(token);
                TypeCombinationService.put(vm.typeCombination)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el tipo de combinación.");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            } else {
            
                var body = {
                    descripcion: vm.typeCombination.descripcion,
                    visualizacionWeb: vm.typeCombination.visualizacionWeb,
                    token: window.atob(token)
                }

                TypeCombinationService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado el tipo de combinación");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            }            
        }

        vm.open = function() {
            $("#modal-typecombination").modal("show");      
        }

        vm.close = function() {
            editing = false;
            vm.typeCombination = {};
            $("#modal-typecombination").modal("hide");    
        }

    };

})();