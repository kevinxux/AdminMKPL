(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('CheckoutController', CheckoutController);

    /* @ngInject */
    function CheckoutController() {
        var vm = this;
        vm.title = 'CheckoutController';

        activate();

        function activate() {
        	console.log(vm.title);
        }
    }
})();