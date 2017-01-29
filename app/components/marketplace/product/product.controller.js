(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('ProductController', ProductController);

    /* @ngInject */
    function ProductController() {
        var vm = this;
        vm.title = 'ProductController';

        activate();

        function activate() {
        	console.log(vm.title);
        }
    }
})();