'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives', 'ui.router', 'angular-cardflow'])

    .config( function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/state1");
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        });
    })
;