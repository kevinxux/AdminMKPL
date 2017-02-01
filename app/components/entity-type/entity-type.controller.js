(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('EntityTypeController', EntityTypeController);

    /* @ngInject */
    function EntityTypeController(Util, EntityTypeService, Jager, store) {
        var vm = this;
        Util.active('entity-type');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {                              
	        EntityTypeService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.entityTypes = res.data;
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

        vm.preEdit = function(entityType) {
            editing = true;
            vm.entityType = JSON.parse(JSON.stringify(entityType));
            vm.open();
        }

        vm.remove = function(){
            isProcessing = true;
            vm.entityType.token = window.atob(token);
            EntityTypeService.remove(vm.entityType)
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
                vm.entityType.token = window.atob(token);
                EntityTypeService.put(vm.entityType)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el tipo de entidad");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            } else {
            
                var body = {
                    descripcion: vm.entityType.descripcion,
                    token: window.atob(token)
                }

                EntityTypeService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado el tipo de entidad");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            }            
        }

        vm.open = function() {
            $("#modal-entityType").modal("show");
        }

        vm.close = function() {
            editing = false;
            vm.entityType = {};
            $("#modal-entityType").modal("hide");
        }

    };

})();