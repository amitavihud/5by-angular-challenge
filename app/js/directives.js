'use strict';

/* Directives */


angular.module('myApp.directives', [])
    .directive("vid", function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/video.html',
            scope: {
                'video': '='
            }
        }
    });
