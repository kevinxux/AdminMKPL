(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('AdminController', AdminController);

	/* @ngInject */
	function AdminController(store, $state, LoginService, Jager) {
		var vm = this;
		vm.logout = logout;

		init();

		function init() {
			$("body").removeClass();
			$("body").addClass("dashboard-page");
			Demo.init();
			Core.init();
		}

		function logout() {
			var data = store.get('X-MKPL-DATA');
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

	};

})();