(function() {
    'use strict';

    angular
        .module('marketplace')
        .factory('Jager', Jager);

    /* @ngInject */
    function Jager() {
        var service = {
        	success: success,
        	info: info,
        	error: error
        };

        return service;

        function success(message) {
            alert("success", message);
        }

        function info(message) {
            alert("info", message);
        }

        function error(message) {
            alert("error", message);
        }

        function alert(type, message) {

            var cls = "jager-alert";
            var body = $("body");

            if (type == null) {
                cls += " alert-info";
            } else if (type == "error") {
                cls += " alert-error";
            } else if (type == "info") {
                cls += " alert-info";
            } else if (type == "success") {
                cls += " alert-success";
            } else {
                cls += " alert-info";
            }

            var el = $("<div></div>").addClass(cls).text(message);
            $(body).append(el);
            el = $(".jager-alert").animate({
                width: 'toggle'
            }, 350).addClass('flex');
            setTimeout(function() {
                $(el).animate({
                    width: '0'
                }, 350, function() {
                    $(this).remove();
                });
            }, 3000);
        }

    };

})();