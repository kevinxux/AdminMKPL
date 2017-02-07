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
        
        init();
        function init() {
            $("#fechaNacimiento").datepicker({
              prevText: '<i class="fa fa-chevron-left"></i>',
              nextText: '<i class="fa fa-chevron-right"></i>',
              showButtonPanel: false,
              beforeShow: function (input, inst) {
                var newclass = 'admin-form';
                var themeClass = $(this).parents('.admin-form').attr('class');
                var smartpikr = inst.dpDiv.parent();
                if (!smartpikr.hasClass(themeClass)) {
                  inst.dpDiv.wrap('<div class="' + themeClass + '"></div>');
                }
              }
            });
        }

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
        
        vm.assignUser = function() {
            vm.user.idEntidad = vm.tempBusinessId;
            vm.user.token = window.atob(token);
            BusinessService.assign(vm.user)
                .then(function(res) {                   
                    if (res.status === 200) {
                        Jager.success("Se ha asignado el usuario");
                        findAll();
                        vm.closeUser();         
                    } else {                            
                        Jager.error(res.data);
                    }
                });
        }

        vm.unassignUser = function() {
            var body = {
                idEntidad: vm.tempBusinessId,
                token: window.atob(token)
            };
            
            BusinessService.unassign(body)
                .then(function(res) {                   
                    if (res.status === 200) {
                        Jager.success("Se ha desasignado el usuario");
                        findAll();
                        vm.closeUser();         
                    } else {                            
                        Jager.error(res.data);
                    }
                });
        }

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        }

        vm.preEditUser = function(business) {
            editing = true;
            vm.tempBusinessId = business.idEntidad;
            BusinessService.findAdminUser(token, business.idEntidad)
                .then(function(res) {
                    if (res.status === 200) {
                        if (res.data == null) {
                            vm.user = {};
                            vm.hasUser = false;
                        } else {
                            vm.user = res.data;
                            vm.hasUser = true;
                        }
                        vm.openUser();
                    } else {
                        console.error(res.data);
                    }
                })       
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

        vm.openUser = function() {
            $("#modal-user").modal("show");
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
            } else {
                $("#modal-business").modal("show");
            }
        }

        vm.close = function() {
            editing = false;
            vm.business = {};
            $("#modal-business").modal("hide");    
        }

        vm.closeUser = function() {
            editing = false;
            vm.user = {};
            vm.tempBusinessId = null;
            $("#modal-user").modal("hide");    
        }

    };

})();