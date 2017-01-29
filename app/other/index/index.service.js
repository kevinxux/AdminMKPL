(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('IndexController', IndexController);

    /* @ngInject */
    function IndexController($scope, $state) {
        var vm = this;

        $scope.goHomeJeanYouAreDrunk = function() {
        	var state = $state.$current.name;
        	if (state.includes("marketplace.")) {
        		$state.go('marketplace.home');
        	} else if (state.includes("admin.")) {
        		$state.go('admin.home');
        	}
        }

    };

})();