(function() {
    'use strict';

    angular
        .module('marketplace')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(LoginService, Jager, Validation, store, $state, $stateParams) {
        var vm = this;

        var isProcessing = false;

        vm.credentials = {};


        init();

        function init() {
            $("body").addClass("external-page sb-l-c sb-r-c");
            Core.init();
            Demo.init();
            CanvasBG.init({
                Loc: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 3.3
                },
            });

            if($state.params.cod){
                vm.token = $state.params.cod;
            }

            if($state.params.isNew) {
                vm.isNew = $state.params.isNew;
                console.log(vm.isNew);
            }
        }

        vm.isProcessing = function() {
            return isProcessing;
        }

        vm.login = function() {
            isProcessing = true;
            if (isOk()) {
                LoginService.login(vm.credentials)
                    .then(function(res) {
                        isProcessing = false;
                        if (res.status === 200) {
                            Jager.success("Has iniciado sesión correctamente");
                            //TODO: Guardar en resources del navegador
                            store.set('X-MKPL-DATA', window.btoa(res.data.token));
                            var user = {
                                tipoId: res.data.idTipoUsuario,
                                tipo: res.data.descripcionTipoUsuario
                            }
                            store.set('X-MKPL-USER', window.btoa(JSON.stringify(user)));
                            vm.credentials = {};
                            $state.go('admin.dashboard');
                        } else {
                            Jager.error(res.data);
                        }
                    })
            } else {
                isProcessing = false;
                return;
            }
        };

        vm.restore = function() {
            isProcessing = true;
            LoginService.restore(vm.restoreU)
                .then(function (res) {
                    isProcessing = false;
                    if(res.status === 200) {
                        Jager.success("Se envio correctamente el email");
                        $state.go('index.login');
                    } else {
                        Jager.error(res.data);
                    }
                });
        };

        vm.newPass = function () {
            isProcessing = true;
            var data = {
                contrasenia: vm.restoreU.password,
                token: vm.token
            };

            if(vm.isNew === 1){
                LoginService.habilitarUser(data)
                    .then(getCall);
            }else{
                LoginService.cambiarContrasena(data)
                    .then(getCall);
            }

            function getCall(res) {
                isProcessing = false;
                if(res.status === 200) {
                    Jager.success("Se restablecio correctamente la contraseña");
                    $state.go('index.login');
                } else {
                    Jager.error(res.data);
                }
            }
        };

        function isOk() {
            if (Validation.mail(vm.credentials.mail)) {
                if (Validation.field(vm.credentials.password, 8, 16)) {
                    return true;
                } else {
                    Jager.error("La contraseña ingresada no es válida");
                    return false;
                }
            } else {
                Jager.error("El correo ingresado no es válido");
                return false;
            }
        }

    };

})();