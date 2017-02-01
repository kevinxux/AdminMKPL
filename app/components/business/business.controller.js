(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('BusinessController', BusinessController);

    /* @ngInject */
    function BusinessController(Util, BusinessService, Jager, store) {
        var vm = this;
        Util.active('business');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');
        
        documentTypes();
        function documentTypes() {
            BusinessService.documentTypes()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.documents = res.data;
                        findAll();
                    }
                })
        };

        entityTypes();
        function entityTypes() {
            BusinessService.entityTypes()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.entityTypes = res.data;
                    }
                })
        };

        function findAll() {                                    
	        BusinessService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.allBusiness = res.data;
	                } else {
	                	console.error(res.data);
	                }
	            })            
        };

        vm.findInDocumentList = function(documentId) {            
            if (documentId == null) return "";
            var value;
            $.each(vm.documents, function(i, e) {             
                if (e.id == documentId) {                                 
                    value = e.descripcion;
                }
            });     
            return value;       
        }


        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        }

        vm.preEdit = function(business) {
            editing = true;
            vm.business = JSON.parse(JSON.stringify(business));
            vm.open();
        }

        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.business.token = window.atob(token);
                BusinessService.put(vm.business)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente la empresa");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            } else {
            
                var body = {
                    descripcion: vm.business.descripcion,
                    token: window.atob(token),
                    idTipoDocumento: vm.business.idTipoDocumento,
                    numeroDocumento: vm.business.numeroDocumento,
                    razonSocial: vm.business.razonSocial,
                    nombreComercial: vm.business.nombreComercial,
                    idUbigeo: vm.business.idUbigeo,
                    domicilioFiscal: vm.business.domicilioFiscal,
                    idTipoEntidad: vm.business.idTipoEntidad,
                    correo: vm.business.correo, 
                    web: vm.business.web, 
                    tiendaVirtual: vm.business.tiendaVirtual,
                    idUbigeo: 1
                }

                BusinessService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado la empresa");
                            findAll();
                            vm.close();         
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            }            
        }

        vm.open = function() {
            $("#modal-business").modal("show");      
        }

        vm.close = function() {
            editing = false;
            vm.business = {};
            $("#modal-business").modal("hide");    
        }

    };

})();