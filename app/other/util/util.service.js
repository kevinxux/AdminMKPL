(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('Util', Util);

    /* @ngInject */
    function Util() {

        var service = {
            active: active,
            open: openModal,
            close: closeModal
        };

        return service;

        function openModal(cls) {              
            $('body').css('overflow', 'hidden');
            $('.pilsen-modal.'+cls).show();
        };

        function closeModal(cls) {
            $('body').css('overflow', 'auto'); 
            $('.pilsen-modal.'+cls).hide();
        };

        function active(category) {
        	$(".sidebar-menu>li.active").removeClass('active');
            $("#" + category).addClass('active');
        }

    };

})();