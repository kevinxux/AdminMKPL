(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController(Jager) {
        var vm = this;

        startSlider();

        vm.addToCart = function() {
            Jager.success("Se añadíó el producto exclusivo al carrito de compras");
        }

        function startSlider() {
            $(".slider").slidesjs({
                width: 1200,
                height: 350,
                navigation: {
                    active: false
                },
                play: {
                    active: false,
                    auto: true,
                    interval: 10000
                },
                pagination: {
                    active: false
                }
            });
        }

    };

})();