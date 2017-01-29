(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController(Util, ProfileService, Jager, store) {
        var vm = this;
        Util.active('profile');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {                              
	        ProfileService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.profiles = res.data;
	                } else {
	                	console.error(res.data);
	                }
	            })            
        };

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        }

        vm.preEdit = function(profile) {
            editing = true;
            vm.profile = JSON.parse(JSON.stringify(profile));
            vm.open();
        }

        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.profile.token = window.atob(token);
                ProfileService.put(vm.profile)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha actualizado correctamente el perfil");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            } else {
            
                var body = {
                    descripcion: vm.profile.descripcion,
                    token: window.atob(token)
                }

                ProfileService.save(body)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado el perfil");
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            }            
        }

        vm.open = function() {
            $("#modal-profile").modal("show");   
        }

        vm.close = function() {
            editing = false;
            vm.profile = {};
            $("#modal-profile").modal("hide");
        }

    };

})();