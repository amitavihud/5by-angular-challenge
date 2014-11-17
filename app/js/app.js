'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        });
    }])
;