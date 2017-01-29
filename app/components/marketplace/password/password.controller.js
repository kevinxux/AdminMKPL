(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('PasswordController', PasswordController);

    /* @ngInject */
    function PasswordController($stateParams, Validation, PasswordService, Jager, $state) {
        var vm = this;

        vm.data = {};
        vm.data.token = $stateParams.activationCode;

        var isProcessing = false;

        vm.setPassword = function() {
            isProcessing = true;
            if (isOk()) {                                	
                PasswordService.setPassword(vm.data)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha asignado correctamente su contraseña. Inicie sesión.");
                            vm.data = {};                
                            $state.go('marketplace.login');
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            } else {
                isProcessing = false;
                return;
            }
        }

        function isOk() {            
                if (Validation.field(vm.data.password, 8, 16)) {
                    if (Validation.passwords(vm.data.password, vm.data.passwordAgain)) {
                        return true;
                    } else {
                        Jager.error("Las contraseñas no coinciden");        
                        return false;
                    }
                } else {
                    Jager.error("La contraseña debe tener entre 8 y 16 carateres.");    
                    return false;
                }            
        }

        vm.isProcessing = function() {
        	return isProcessing;
        }

    };

})();