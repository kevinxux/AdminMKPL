(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('CartController', CartController);

    /* @ngInject */
    function CartController() {
        var vm = this;
        vm.title = 'CartController';

        activate();

        function activate() {
        	console.log(vm.title);
        }
    }
})();