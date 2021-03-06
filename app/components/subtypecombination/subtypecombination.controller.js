(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('SubTypeCombinationController', SubTypeCombinationController);

    /* @ngInject */
    function SubTypeCombinationController(Util, SubTypeCombinationService, TypeCombinationService, Jager, store) {
        var vm = this;
        Util.active('subSubtypecombination');

        vm.idTipoCombinacion = 0;

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');
        vm.changeSelect = function() {
            findAll();
        }
        findAllTypes();
        function findAll() {                              
	        SubTypeCombinationService.findAll(vm.TypeCombination)
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.subTypeCombinations = res.data;	                    
	                } else {
	                	console.error(res.data);
	                }
	            })            
        };
        function findAllTypes(){
            TypeCombinationService.findAll()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.TypeCombinations = res.data;
                        vm.TypeCombination = vm.TypeCombinations.length > 0 ? vm.TypeCombinations[0] : 0;
                        findAll();
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
        vm.preEdit = function(subTypeCombination) {
            editing = true;
            vm.subTypeCombination = JSON.parse(JSON.stringify(subTypeCombination));
            vm.open();
        }
        vm.remove = function(){
            isProcessing = true;
            vm.subTypeCombination.token = window.atob(token);
            TypeCombinationService.remove(vm.subTypeCombination)
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
                vm.subTypeCombination.token = window.atob(token);
                SubTypeCombinationService.put(vm.subTypeCombination)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el subtipo de combinación.");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            } else {
            
                var body = {
                    idTipoCombinacion: vm.TypeCombination.idTipoCombinacion,
                    descripcion: vm.subTypeCombination.descripcion,
                    token: window.atob(token)
                }

                SubTypeCombinationService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado el subtipo de combinación");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            }            
        }

        vm.open = function() {
            $("#modal-subtypecombination").modal("show");      
        }

        vm.close = function() {
            editing = false;
            vm.subTypeCombination = {};
            $("#modal-subtypecombination").modal("hide");    
        }

    };

})();