(function() {
    'use strict';

    angular
        .module('marketplace', [
            'ui.router',
            'oc.lazyLoad',
            'angular-storage',
            'file-model',
            'chart.js'
        ])
        .constant('BASE_PATH', "http://mkpl.azurewebsites.net/api/")
        //.constant('BASE_PATH', "http://localhost:53690/api/")
        .config(router)
        .run(security);

    /* @ngInject */
    function security($rootScope, $state, store) {
        $rootScope.$on('$stateChangeStart', function(e, to) {  

            var token = window.atob(store.get('X-MKPL-DATA'));

            if (to.data && to.data.requiresLogin) {
                console.log('requires login');
                if (!token) {
                    console.log('no token');
                }
            } else {
                if (to.name == 'marketplace.login' && token) {
                    console.log('-> Login but has token');
                }
            }
        });      

    };

    /* @ngInject */
    function router($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise(function($injector, $location) {
            var $state = $injector.get("$state");
            $state.go("index.login");
        });

        $stateProvider

            .state('index', {
                abstract: true,
                templateUrl: './app/components/index/index.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/login/login.controller.js',
                                './app/components/login/login.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('index.login', {
                url: '/login',
                templateUrl: './app/components/login/login.view.html'
            })

            .state('index.recuperar', {
                url: '/recuperar',
                templateUrl: './app/components/index/recuperar.view.html'
            })

            .state('index.newPass', {
                url: '/nueva-contrasena/{cod}/{isNew}',
                templateUrl: './app/components/index/newpassword.view.html'
            })

            .state('admin', {
                abstract: true,                
                templateUrl: './app/components/admin/admin.view.html',
                controller: 'AdminController',
                controllerAs: 'vm',                
                resolve: {
                    deps: ['$ocLazyLoad',
                        function(lazy) {
                            return lazy.load([{
                                files: [
                                    './app/components/admin/admin.controller.js',
                                    './app/components/login/login.service.js',
                                    './app/components/admin/admin.service.js'
                                    // './css/culqi-prepanel.css',
                                ]
                            }]);
                        }
                    ]
                }
            })

            .state('admin.dashboard', {
                url: '/dashboard',
                templateUrl: './app/components/dashboard/dashboard.view.html',
                controller: 'DashboardController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/dashboard/dashboard.controller.js',
                                './app/components/dashboard/dashboard.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.home', {
                url: '/home',
                templateUrl: './app/components/admin/home/home.view.html',
                controller: 'AdminHomeController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/admin/home/home.controller.js',
                                './app/components/admin/home/home.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.currency', {
                url: '/currency',
                templateUrl: './app/components/currency/currency.view.html',
                controller: 'CurrencyController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/currency/currency.controller.js',
                                './app/components/currency/currency.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.business', {
                url: '/business',
                templateUrl: './app/components/business/business.view.html',
                controller: 'BusinessController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/business/business.controller.js',
                                './app/components/business/business.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.category', {
                url: '/category',
                templateUrl: './app/components/category/category.view.html',
                controller: 'CategoryController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/category/category.controller.js',
                                './app/components/category/category.service.js'
                            ]
                        }]);
                    }]
                }
            })


            .state('admin.profile', {
                url: '/profile',
                templateUrl: './app/components/profile/profile.view.html',
                controller: 'ProfileController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/profile/profile.controller.js',
                                './app/components/profile/profile.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.membership', {
                url: '/membership',
                templateUrl: './app/components/membership/membership.view.html',
                controller: 'MembershipController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/membership/membership.controller.js',
                                './app/components/membership/membership.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.parameter', {
                url: '/parameter',
                templateUrl: './app/components/parameter/parameter.view.html',
                controller: 'ParameterController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/parameter/parameter.controller.js',
                                './app/components/parameter/parameter.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.courier', {
                url: '/courier',
                templateUrl: './app/components/courier/courier.view.html',
                controller: 'CourierController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/courier/courier.controller.js',
                                './app/components/courier/courier.service.js'
                            ]
                        }]);
                    }]
                }
            })
            .state('admin.entity', {
                url: '/entity/entity',
                templateUrl: './app/components/entity/entity.view.html',
                controller: 'EntityController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/entity/entity.controller.js',
                                './app/components/entity/entity.service.js'
                            ]
                        }]);
                    }]
                }
            })
            .state('admin.entity-type', {
                url: '/entity/type',
                templateUrl: './app/components/entity-type/entity-type.view.html',
                controller: 'EntityTypeController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/entity-type/entity-type.controller.js',
                                './app/components/entity-type/entity-type.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.user', {
                url: '/user',
                templateUrl: './app/components/admin/user/user.view.html',
                controller: 'UserController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/admin/user/user.controller.js',
                                './app/components/admin/user/user.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.combinationType', {
                url: '/typecombination',
                templateUrl: './app/components/typecombination/typecombination.view.html',
                controller: 'TypeCombinationController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/typecombination/typecombination.controller.js',
                                './app/components/typecombination/typecombination.service.js'
                            ]
                        }]);
                    }]
                }
            })

            .state('admin.combinationSubType', {
                url: '/subtypecombination',
                templateUrl: './app/components/subtypecombination/subtypecombination.view.html',
                controller: 'SubTypeCombinationController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/subtypecombination/subtypecombination.controller.js',
                                './app/components/subtypecombination/subtypecombination.service.js',
                                './app/components/typecombination/typecombination.service.js'
                            ]
                        }]);
                    }]
                }
            })
            .state('admin.subcategories', {
                url: '/subcategories',
                templateUrl: './app/components/subcategory/subcategory.view.html',
                controller: 'SubcategoryController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/subcategory/subcategory.controller.js',
                                './app/components/subcategory/subcategory.service.js',
                                './app/components/category/category.service.js'
                            ]
                        }]);
                    }]
                }
            })
            .state('admin.couriersEntity', {
                url: '/couriers-entity',
                templateUrl: './app/components/couriersentity/couriersentity.view.html',
                controller: 'CouriersEntityController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/couriersentity/couriersentity.controller.js',
                                './app/components/couriersentity/couriersentity.service.js'
                            ]
                        }]);
                    }]
                }
            })
            .state('admin.establishment', {
                url: '/establishment',
                templateUrl: './app/components/establishment/establishment.view.html',
                controller: 'EstablishmentController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/establishment/establishment.controller.js',
                                './app/components/establishment/establishment.service.js'
                            ]
                        }]);
                    }]
                }
            })
            .state('admin.businessproducts', {
                url: '/businessproducts',
                templateUrl: './app/components/products/products.view.html',
                controller: 'ProductsController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/products/products.controller.js',
                                './app/components/products/products.service.js'
                            ]
                        }]);
                    }]
                }
            })
            .state('admin.combo', {
                url: '/combo',
                templateUrl: './app/components/combo/combo.view.html',
                controller: 'ComboController',
                controllerAs: 'vm',
                resolve: {
                    deps: ['$ocLazyLoad', function(lazy) {
                        return lazy.load([{
                            files: [
                                './app/components/combo/combo.controller.js',
                                './app/components/combo/combo.service.js'
                            ]
                        }]);
                    }]
                }
            })

    };

})();