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
                        Jager.success("Has salido correctamente");

                        store.remove('X-MKPL-DATA');
                        $state.go('login');
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


	};

})();