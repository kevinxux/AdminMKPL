(function() {
	'use strict';

	angular
		.module('marketplace')
		.controller('AdminController', AdminController);

	/* @ngInject */
	function AdminController() {
		var vm = this;

		init();

		function init() {
			$("body").removeClass();
			$("body").addClass("dashboard-page");
			Demo.init();
			Core.init();
		}

	};

})();