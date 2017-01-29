(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('RegisterController', RegisterController);

    /* @ngInject */
    function RegisterController(Validation, Jager, RegisterService, $state) {
        var vm = this;
    
        var isProcessing = false;
        var isFinished = false;

        vm.user = {};

        documentTypes();
        function documentTypes() {
            RegisterService.documentTypes()
                .then(function(res) {
                    if (res.status === 200) {
                        vm.documents = res.data;
                    }
                })
        };

        vm.register = function() {
            isProcessing = true;
            if (isOk()) {                    
                RegisterService.postNewUser(vm.user)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Se ha registrado correctamente al usuario");
                            vm.user = {};                
                            isFinished = true;
                        } else {                            
                            Jager.error(res.data);
                        }
                    });
            } else {
                isProcessing = false;
                return;
            }
        }

        vm.isProcessing = function() {
            return isProcessing;
        }

        vm.showForm = function() {
            return !isFinished;
        }

        function isOk() {
            //TODO Validar dni y tipo de documento
            if (Validation.mail(vm.user.mail)) {
                if (Validation.field(vm.user.name, 2, 20)) {
                    if (Validation.field(vm.user.lastName, 2, 20)) {
                        return true;
                    } else {
                        Jager.error("Ingrese un apellido válido, debe tener entre 2 y 20 caracteres");        
                        return false;
                    }
                } else {
                    Jager.error("Ingrese un nombre válido, debe tener entre 2 y 20 caracteres");    
                    return false;
                }
            } else {
                Jager.error("Ingrese un correo electrónico válido");
                return false;
            }
        }

    };

})();