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
        
        ubigeo();
        function ubigeo() {
            BusinessService.ubigeo()
                .then(function (res) {
                    if (res.status === 200) {
                        vm.departamentos = res.data;                            
                    } else {
                        Jager.error(res.data);
                    }
                });
        }

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

        vm.setProvincias = function () {
          vm.provincias = vm.business.departamento.provincias;
        };

        vm.setDistritos = function () {
          vm.distritos = vm.business.provincia.distritos;          
        };

        entityTypes();
        function entityTypes() {
            BusinessService.entityTypes(token)
                .then(function(res) {
                    if (res.status === 200) {
                        vm.entityTypes = res.data;
                    }
                })
        };

        function findAll() {                                    
	        BusinessService.findAll(token)
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
            vm.business.departamento = {};
            vm.business.provincia = {};
            vm.business.distrito = {};
            vm.business.departamento.idUbigeo = vm.business.idDepartamento;
            vm.business.provincia.idUbigeo = vm.business.idProvincia;
            vm.business.distrito.idUbigeo = vm.business.idDistrito;
            vm.open();
        }

        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.business.idDepartamento = vm.business.departamento.idUbigeo;
                vm.business.idProvincia = vm.business.provincia.idUbigeo;
                vm.business.idDistrito = vm.business.distrito.idUbigeo;
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
                    numeroDocumento: vm.business.numeroDocumento,
                    razonSocial: vm.business.razonSocial,
                    nombreComercial: vm.business.nombreComercial,
                    idDepartamento: vm.business.departamento.idUbigeo,
                    idProvincia: vm.business.provincia.idUbigeo,
                    idDistrito: vm.business.distrito.idUbigeo,
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
            if (editing) {
                for(var i = 0; i < vm.departamentos.length; i++){
                    if(vm.business.idDepartamento == vm.departamentos[i].idUbigeo){
                        vm.business.departamento = vm.departamentos[i];
                        vm.setProvincias();
                        for(var j = 0; j < vm.departamentos[i].provincias.length; j++){
                            if(vm.business.idProvincia == vm.departamentos[i].provincias[j].idUbigeo){
                                vm.business.provincia = vm.departamentos[i].provincias[j];
                                vm.setDistritos();
                                for(var k = 0; k < vm.departamentos[i].provincias[j].distritos.length; k++){
                                    if(vm.business.idDistrito == vm.departamentos[i].provincias[j].distritos[k].idUbigeo){
                                        vm.business.distrito = vm.departamentos[i].provincias[j].distritos[k];
                                        $("#modal-business").modal("show");
                                    }
                                }
                            }
                        }
                    }
                }
            }   
        }

        vm.close = function() {
            editing = false;
            vm.business = {};
            $("#modal-business").modal("hide");    
        }

    };

})();