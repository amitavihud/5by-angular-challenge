'use strict';

/* Controllers */

angular.module('myApp.controllers', [])

    .controller('HomeCtrl', function ($scope, Youtube, $q, Cache) {
        $scope.cardflowSnapKinetic = {current: Cache.getLastSelectedId()};
        // Get the videos list from cache service (it takes that list from the local storage)
        // If it null (means no list exists), initialize with empty array.
        $scope.videos = Cache.getVideoList() || [];

        $scope.select = function (index) {
            $scope.cardflowSnapKinetic.current = index;
        }

        $scope.back = function () {
            if ($scope.cardflowSnapKinetic.current > 0) {
                $scope.cardflowSnapKinetic.current--;
                Cache.setLastSelectedId($scope.cardflowSnapKinetic.current);
            }
        }

        $scope.next = function () {
            if ($scope.cardflowSnapKinetic.current < $scope.videos.length - 1) {
                $scope.cardflowSnapKinetic.current++;
                Cache.setLastSelectedId($scope.cardflowSnapKinetic.current);
            }
        }

        $scope.removeVideo = function (video) {
            for (var i = 0; i < $scope.videos.length; i++) {
                if ($scope.videos[i].id == video.id) {
                    $scope.videos.splice(i, 1);
                    Cache.setVideoList($scope.videos);
                    $scope.cardflowSnapKinetic.current--;
                    return;
                }
            }
        }

        $scope.addLink = function (link) {
            $scope.addVideoLinkForm.$setValidity('existence', true);
            $scope.addVideoLinkForm.$setValidity('url', true);

            // Get the video id from full link
            var videoId = link.substring(link.indexOf("v=") + "v=".length);

            // Is this video already exist in list
            for (var i = 0; i < $scope.videos.length; i++) {
                if ($scope.videos[i].id == videoId) {
                    $scope.addVideoLinkForm.$setValidity('existence', false);
                    return;
                }
            }

            // Then get the data from youtube api
            Youtube
                .getVideo(videoId)
                .then(function (res) {
                    if (res.data && res.data.items && res.data.items.length == 1) {
                        $scope.videos.push(res.data.items[0]);
                        Cache.setVideoList($scope.videos);
                    } else {
                        // No data received from youtube api
                        return $q.reject();
                    }
                })
                .then(null, function () {
                    $scope.addVideoLinkForm.$setValidity('url', false);
                });
        }
    });