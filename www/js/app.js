angular.module('app', [
    'ionic', 
    'ngCordova', 
    'uiGmapgoogle-maps',
    'app.service.db', 
    'app.model.activity',
    'app.model.agency',
    'app.model.entity',
    'app.model.person',
    'app.model.household',
    'app.model.user',
    'app.model.opportunity',
    'app.model.company',
    'app.model.addActivityModal',
    'app.service.entity',
    'app.service.opportunity',
    'app.service.user',
    'app.service.appvars',
    'app.service.agency',
    'app.ctrl.alerts',
    'app.ctrl.companies',  
    'app.ctrl.company',  
    'app.ctrl.favorites',  
    'app.ctrl.home',  
    'app.ctrl.households',  
    'app.ctrl.household',  
    'app.ctrl.nearMe',
    'app.ctrl.notices',
    'app.ctrl.mapTest',
    'app.ctrl.mapTestCustomDirective',  
    'app.ctrl.mapTestJavascript', 
    'app.ctrl.opportunities',
    'app.ctrl.opportunity',
    'app.ctrl.person',  
    'app.ctrl.personMap',  
    'app.ctrl.persons',  
    'app.ctrl.recentlyViewed',  
    'app.ctrl.search',
    'app.ctrl.settings',
    'app.directives'
]) 

.config(
    function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('app', {
            url:          "/app",
            abstract:     true,
            templateUrl:  "templates/menu.tpl.html",
            controller:   'MenuCtrl as model',
            resolve: {
                loadApp: function($rootScope, DBService, User) {

                    $rootScope.SESSION    = {};
                    $rootScope.CONSTANTS  = {};
                    $rootScope.USER       = new User();  

                    var checkDbVersion = function() {
                        return DBService.checkDbVersion();
                    };
                    var loadUser = function() {
                        return $rootScope.USER.loadByNetworkId("BXE004").then(function(){
                            //$rootScope.USER = user;
                            return true;
                        });
                    };

                    return checkDbVersion().then(loadUser);

                }
            }
        });
    
        $urlRouterProvider.otherwise('/app/home');

    }
)

.run(function($ionicPlatform, $rootScope, User, Agency) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
  

        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            if (fromState.name === '' && toState.name !== 'app.home') {
                e.preventDefault();
                $state.go('app.home');
            }
        });

    });
})

.controller('MenuCtrl', 
    function($scope, $rootScope, $state, $ionicSideMenuDelegate) {
        
        var model       = this;
        var SESSION     = $rootScope.SESSION;
        var CONSTANTS   = $rootScope.CONSTANTS;
        var USER        = $rootScope.USER;

        console.log("menu controller");
        
        model.forceReset = function(){
            USER.forceReset().then(function(){
                $ionicSideMenuDelegate.toggleLeft();
            });
        };
    }
)
.controller('AppCtrl',
    function($scope, $rootScope) {

        var app         = this;
        var SESSION     = $rootScope.SESSION;
        var CONSTANTS   = $rootScope.CONSTANTS;
        var USER        = $rootScope.USER;

        console.log("app controller");

    }
)
;