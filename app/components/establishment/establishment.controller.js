(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('EstablishmentController', CouriersEntityController);

    /* @ngInject */
    function CouriersEntityController(Util, Jager, store, EstablishmentService) {
        var vm = this;
        //Util.active('couriersEntity');

        var editing = false;

        var isProcessing = false;

        var token = window.atob(store.get('X-MKPL-DATA'));

        findAll();
        function findAll() {
            EstablishmentService.findAll(token)
                .then(function(res) {
                    if (res.status === 200) {
                        vm.establishments = res.data;
                    } else {
                        console.error(res.data);
                    }
                })
        };

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        };
        vm.showdelete = function(){
            return editing;
        };
        vm.preEdit = function(establishment) {
            editing = true;
            vm.establishment = JSON.parse(JSON.stringify(establishment));
            vm.open();
        };
        vm.remove = function(){
            isProcessing = true;
            vm.establishment.token = token;

            EstablishmentService.remove(vm.establishment)
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

        };
        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.establishment.token = token;
                EstablishmentService.put(vm.establishment)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el Establecimiento");
                            findAll();
                            vm.close();
                        } else {
                            Jager.error(res.data);
                        }
                    });
            } else {
                vm.establishment.token = token;
                vm.establishment.estado = true;
                vm.establishment.idDepartamento = vm.establishment.departamento.idUbigeo;
                vm.establishment.idProvincia = vm.establishment.provincia.idUbigeo;
                vm.establishment.idDistrito = vm.establishment.distrito.idUbigeo;

                EstablishmentService.save(vm.establishment)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado correctamente el Establecimiento");
                            findAll();
                            vm.close();
                        } else {
                            Jager.error(res.data);
                        }
                    });
            }
        };

        vm.open = function() {
            EstablishmentService.ubigeo()
                .then(function (res) {
                    if (res.status === 200) {
                        vm.departamentos = res.data;
                        if (editing) {
                            for(var i = 0; i < vm.departamentos.length; i++){
                                if(vm.establishment.idDepartamento == vm.departamentos[i].idUbigeo){
                                    vm.establishment.departamento = vm.departamentos[i];
                                    vm.setProvincias();
                                    for(var j = 0; j < vm.departamentos[i].provincias.length; j++){
                                        if(vm.establishment.idProvincia == vm.departamentos[i].provincias[j].idUbigeo){
                                            vm.establishment.provincia = vm.departamentos[i].provincias[j];
                                            vm.setDistritos();
                                            for(var k = 0; k < vm.departamentos[i].provincias[j].distritos.length; k++){
                                                if(vm.establishment.idDistrito == vm.departamentos[i].provincias[j].distritos[k].idUbigeo){
                                                    vm.establishment.distrito = vm.departamentos[i].provincias[j].distritos[k];
                                                    $("#modal-courierentity").modal("show");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        Jager.error(res.data);
                    }
                });
        };

        vm.close = function() {
            editing = false;
            vm.establishment = {};
            $("#modal-courierentity").modal("hide");
        };

        vm.setProvincias = function () {
          vm.provincias = vm.establishment.departamento.provincias;
        };

        vm.setDistritos = function () {
          vm.distritos = vm.establishment.provincia.distritos;
        };
    };

})();