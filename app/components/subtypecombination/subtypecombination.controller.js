(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('SubTypeCombinationController', SubTypeCombinationController);

    /* @ngInject */
    function SubTypeCombinationController(Util, SubTypeCombinationService, Jager, store) {
        var vm = this;
        Util.active('subSubtypecombination');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {                              
	        SubTypeCombinationService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.subTypeCombinations = res.data;
	                } else {
	                	console.error(res.data);
	                }
	            })            
        };
        // findAllTypes();
        // function findAllTypes() {                              
        //     TypeCombinationService.findAll()
        //         .then(function(res) {
        //             if (res.status === 200) {
        //                 vm.typeCombinations = res.data;
        //             } else {
        //                 console.error(res.data);
        //             }
        //         })            
        // };

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
                    } else {
                        Jager.error(res.data);
                    }
                    vm.close();
                });

        }
        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.subTypeCombination.token = window.atob(token);
                TypeCombinationService.put(vm.subTypeCombination)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el subtipo de combinación.");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            } else {
            
                var body = {
                    descripcion: vm.subTypeCombination.descripcion,
                    token: window.atob(token)
                }

                TypeCombinationService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado el subtipo de combinación");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
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