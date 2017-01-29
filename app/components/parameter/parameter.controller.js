(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('ParameterController', ParameterController);

    /* @ngInject */
    function ParameterController(Util, ParameterService, Jager, store) {
        var vm = this;
        Util.active('parameter');

        var editing = false;

        var isProcessing = false;

        var token = store.get('X-MKPL-DATA');

        findAll();
        function findAll() {                              
	        ParameterService.findAll()
	            .then(function(res) {
	                if (res.status === 200) {
	                    vm.parameters = res.data;
	                } else {
	                	console.error(res.data);
	                }
	            })            
        };

        vm.buttonPopup = function() {
            return editing ? "Editar" : "Agregar";
        }

        vm.preEdit = function(parameter) {
            editing = true;
            vm.parameter = JSON.parse(JSON.stringify(parameter));
            vm.open();
        }

        vm.ok = function() {
            isProcessing = true;
            if (editing) {
                vm.parameter.token = window.atob(token);
                ParameterService.put(vm.parameter)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success(res.data);
                            findAll();
                        } else {                            
                            Jager.error(res.data);
                        }
                        vm.close();         
                    });
            }
        }

        vm.open = function() {
            $("#modal-parameter").modal("show");            
        }

        vm.close = function() {
            editing = false;
            vm.parameter = {};
            $("#modal-parameter").modal("hide");            
        }

    };

})();