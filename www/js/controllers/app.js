"use strict";
 
 angular.module('app', [
    'ionic', 
    'google-maps',
    'LocalStorageModule',
    'app.model.activity',
    'app.model.agency',
    'app.model.person',
    'app.model.household',
    'app.model.user',
    'app.model.opportunity',
    'app.model.company',
    'app.service.addActivityModal',
    'app.service.person',
    'app.service.household',
    'app.service.company',
    'app.service.opportunity',
    'app.service.user',
    'app.service.agency',
    'app.ctrl.companies',  
    'app.ctrl.company',  
    'app.ctrl.favorites',  
    'app.ctrl.home',  
    'app.ctrl.households',  
    'app.ctrl.household',  
    'app.ctrl.nearMe',
    'app.ctrl.map',  
    'app.ctrl.mapNew',  
    'app.ctrl.mapDirective',  
    'app.ctrl.mapDirectiveFull', 
    'app.ctrl.opportunities',
    'app.ctrl.opportunity',
    'app.ctrl.person',  
    'app.ctrl.personMap',  
    'app.ctrl.persons',  
    'app.ctrl.recentlyViewed',  
    'app.ctrl.settings',
    'app.directives'
])

.config(
    function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "app/menu.tpl.html",
            controller: 'MenuCtrl as model',
            resolve: {
                loadApp: function($rootScope, $http, $q) {


                    var loadDB = function() {
                        return $http.get('assets/json/init.json').success(function(response) {
                            $rootScope.INIT = response.INIT;
                            return true;
                        });
                    };
                    var loadUser = function() {
                        return $rootScope.USER.loadByNetworkId("BXE004").then(function(user){
                            $rootScope.USER = user;
                            return true;
                        });
                    };

                    return loadDB().then(loadUser);

                }
            }
        });
    
        $urlRouterProvider.otherwise('/app/home');

    }
)

.run(
    function($ionicPlatform, $rootScope, $state, User, Agency, localStorageService) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            };
            if(window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            };
        });

        var SESSION     = $rootScope.SESSION    = {};
        var CONSTANTS   = $rootScope.CONSTANTS  = {};
        var USER        = $rootScope.USER       = new User();    

        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            if (fromState.name === '' && toState.name !== 'app.home') {
                e.preventDefault();
                $state.go('app.home');
            };
        });

    }
)

.controller('MenuCtrl', 
    function($scope, $rootScope, $state, $ionicSideMenuDelegate) {
        
        var model       = this;
        var SESSION     = $rootScope.SESSION;
        var CONSTANTS   = $rootScope.CONSTANTS;
        var USER        = $rootScope.USER;

    }
)
.controller('AppCtrl',
    function($scope, $rootScope) {

        var app         = this;
        var SESSION     = $rootScope.SESSION;
        var CONSTANTS   = $rootScope.CONSTANTS;
        var USER        = $rootScope.USER;

    }
)
;

