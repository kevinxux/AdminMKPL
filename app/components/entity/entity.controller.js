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

        function findUbigeo(ubigeoList, idUbigeo) {
            for (var i = 0; i < ubigeoList.length; i++) {
                if (ubigeoList[i].idUbigeo == idUbigeo) {
                    return ubigeoList[i];
                }
            }
        }
    
        ubigeo();
        function ubigeo() {                              
            EntityService.ubigeo()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.ubigeo = res.data;
                        get();
                    } else {
                        console.error(res.data);
                    }
                })            
        };
        
        function get() {                              
	        EntityService.get(window.atob(token))
	            .then(function(res) {
	                if (res.status === 200) {
                        console.log(window.atob(token));
                        vm.entity = res.data;
                        vm.departamento = findUbigeo(vm.ubigeo, vm.entity.idDepartamento);
                        vm.provincia = findUbigeo(vm.departamento.provincias, vm.entity.idProvincia);
                        vm.distrito = findUbigeo(vm.provincia.distritos, vm.entity.idDistrito); 
	                } else {
	                	console.error(res.data);
	                }
	            });
    
        };

        vm.ok = function() {
            isProcessing = true;
            vm.entity.token = window.atob(token);
            vm.entity.idDepartamento = vm.departamento.idUbigeo;
            vm.entity.idProvincia = vm.provincia.idUbigeo;
            vm.entity.idDistrito = vm.distrito.idUbigeo;
            EntityService.put(vm.entity)
                .then(function(res) {
                    isProcessing = false;
                    if (res.status === 200) {
                        Jager.success("Se han actualizado correctamente los datos.");
                    } else {                            
                        Jager.error(res.data);
                    }
                });
        }

        vm.uploadFiles = function() {
            isProcessing = true;
            var body = {
                banner: vm.entity.banner,
                logo: vm.entity.logo,
                token: window.atob(token)
            };
            console.log(body);
            EntityService.image(body)
                .then(function(res) {
                    isProcessing = false;
                    if (res.status === 200) {
                        Jager.success("Se han actualizado correctamente las imagenes.");
                    } else {                            
                        Jager.error(res.data);
                    }
                });
        }
    };

})();