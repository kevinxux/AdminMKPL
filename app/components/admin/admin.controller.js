(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('AdminController', AdminController);

	/* @ngInject */
	function AdminController(store, $state, LoginService, Jager, AdminService) {
		var vm = this;
		vm.logout = logout;
		vm.showModalContrasena = showModalContrasena;
		vm.cambiarContrasena = cambiarContrasena;
		
		init();

		vm.user = JSON.parse(window.atob(store.get('X-MKPL-USER')));

		function init() {
			$("body").removeClass();
			$("body").addClass("dashboard-page");
			Demo.init();
			Core.init();
		}

		function logout() {
			var data = window.atob(store.get('X-MKPL-DATA'));
            LoginService.logout(data)
                .then(function(res) {
                    if (res.status === 200) {
                        Jager.success("Has cerrado sesión correctamente");
						store.remove('X-MKPL-USER');
                        store.remove('X-MKPL-DATA');
                        $state.go('index.login');
                    } else {
                        Jager.error(res.data);
                    }
                });
        };

		function showModalContrasena() {
            $("#cambiarContrasenaModal").modal("show");
        }

		function cambiarContrasena() {
			vm.password.token = window.atob(store.get('X-MKPL-DATA'));
			var data = vm.password;
			AdminService.cambiarContrasena(data)
				.then(function(res){
                    if (res.status === 200) {
                        Jager.success("Se actualizo correctamente");
                        vm.password = {};
                        $("#cambiarContrasenaModal").modal("hide");
                    } else {
                        Jager.error(res.data);
                    }
				});
        }

        vm.showModalSettings = function () {
            var token = window.atob(store.get('X-MKPL-DATA'));
            AdminService.getDataUsuario(token)
                .then(function(res){
                    if (res.status === 200) {
						vm.usuario = res.data;
                    }
                });
            $("#settingsModal").modal("show");
        };

        vm.editarUsuario = function () {
            vm.usuario.token = window.atob(store.get('X-MKPL-DATA'));
            AdminService.put(vm.usuario)
                .then(function(res){
                    if (res.status === 200) {
                        Jager.success("Se actualizo correctamente");
                        vm.usuario = {};
                        $("#settingsModal").modal("hide");
                    }
                });
        }


	};

})();