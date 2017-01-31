(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('MembershipController', MembershipController);

    /* @ngInject */
    function MembershipController(Util, MembershipService, Jager, store) {
        var vm = this;
        Util.active('membership');

        var editing = false,
            deleting = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {                              
	        MembershipService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.memberships = res.data;
	                } else {
	                	console.error(res.data);
	                }
	            })            
        };

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        }

        vm.preEdit = function(membership) {
            editing = true;
            vm.membership = JSON.parse(JSON.stringify(membership));
            vm.open();
        }

        vm.showdelete = function(){
            return editing;
        }

        vm.delete = function() {
            isProcessing = true;

            var deleteParameters = {
                idMembresia: vm.membership.idMembresia,
                token: window.atob(token)
            }

            MembershipService.del(deleteParameters)
                .then(function(res) {
                    isProcessing = false;
                    if (res.status === 200) {
                        Jager.success("Se ha eliminado correctamente la membresía");
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
                vm.membership.token = window.atob(token);
                MembershipService.put(vm.membership)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente la membresía");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            } else {
            
                var body = {
                    descripcion: vm.membership.descripcion,
                    token: window.atob(token),
                    numerodeUsuario: vm.membership.numerodeUsuario,
                    cantidadEstablecimientos: vm.membership.cantidadEstablecimientos,
                    productosEstablecimientos: vm.membership.productosEstablecimientos,
                    productosDestacados: vm.membership.productosDestacados,
                    costo: vm.membership.costo,
                    creacionRoles: vm.membership.creacionRoles,
                    personalizacion: vm.membership.personalizacion,
                    activacion: vm.membership.activacion,
                }

                MembershipService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado la membresía");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            }            
        }

        vm.open = function() {
            $("#modal-membership").modal("show");            
        }

        vm.deleteModalOpen = function() {
            $("#delete-membership").modal("show");            
        }

        vm.close = function() {
            editing = false;
            vm.membership = {};
            $("#modal-membership").modal("hide");            
        }

        vm.closeDeleteModal = function() {
            deleting = false;
            vm.membership = {};
            $("#delete-membership").modal("hide");            
        }

    };

})();