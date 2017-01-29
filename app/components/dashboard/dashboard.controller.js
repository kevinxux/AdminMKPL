(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('DashboardController', DashboardController);

    /* @ngInject */
    function DashboardController(Util) {
        var vm = this;
        Util.active('dashboard');

    };

})();