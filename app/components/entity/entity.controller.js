(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('EntityController', EntityController);

    /* @ngInject */
    function EntityController(Util, EntityService, Jager, store) {
        var vm = this;
        Util.active('entity');

        var isProcessing = false;
        var token = store.get('X-MKPL-DATA');
        vm.depaIndex = '', 
        vm.provIndex = '', 
        vm.distIndex = '',
        vm.provincias = [],
        vm.distritos = [];

        vm.fillProvincia = function () {
            vm.provincias = vm.ubigeo[vm.depaIndex].provincias;
            console.log('provincias: ', vm.provincias);
            vm.entity.idDepartamento = vm.ubigeo[vm.depaIndex].idUbigeo;
        }

        vm.fillDistrito = function () {
            vm.distritos = vm.provincias[vm.provIndex].distritos;
            vm.entity.idProvincia = vm.provincias[vm.provIndex].idUbigeo;
        }

        ubigeo();
        function ubigeo() {                              
            EntityService.ubigeo()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.ubigeo = res.data;
                        get();
                        // document.getElementById('provincia').selectedIndex = vm.depaIndex;
                    } else {
                        console.error(res.data);
                    }
                })            
        };
       
        function get() {                              
	        EntityService.get(window.atob(token))
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.entity = res.data;
                        for (var i = 0; i < vm.ubigeo.length; i++) {
                            if (vm.ubigeo[i].idUbigeo == vm.entity.idDepartamento) {
                                vm.depaIndex = i;
                                vm.provincias = vm.ubigeo[vm.depaIndex].provincias;
                                
                            }
                        }
                        vm.fillProvincia();
                        for (var i = 0; i < vm.ubigeo[vm.depaIndex].provincias.length; i++) {
                            if (vm.ubigeo[vm.depaIndex].provincias[i].idUbigeo == vm.entity.idProvincia) {
                                vm.provIndex = i; 
                            }
                        }
                        
                                        
                        for (var i = 0; i < vm.ubigeo[vm.depaIndex].provincias[vm.provIndex].distritos.length; i++) {
                            if (vm.ubigeo[vm.depaIndex].provincias[vm.provIndex].distritos[i].idUbigeo == vm.entity.idDistrito) {
                                vm.distIndex = i; 
                                document.getElementById('distrito').value = i;
                            }
                        }
                        console.log(vm.depaIndex, vm.provIndex, vm.distIndex);
	                } else {
	                	console.error(res.data);
	                }
	            });
    
        };

       

  
        vm.ok = function() {
            isProcessing = true;
            vm.entity.token = window.atob(token);
            EntityService.put(vm.entity)
                .then(function(res) {
                    isProcessing = false;
                    if (res.status === 200) {
                        Jager.success("Se ha actualizado correctamente el tipo de combinación.");
                    } else {                            
                        Jager.error(res.data);
                    }
                });
        }
    };

})();