'use strict';

/* Services */

angular.module('myApp.services', ['LocalStorageModule'])

    // Stores the api-key for accessing youtube api
    .value('GoogleApiKey', {
        apiKey: 'AIzaSyBabIWXZ0c60KgBKKMuiDdrM9SRgan9T00'
    })

    // Service for fetching data from youtube api
    .factory("Youtube", function ($http, GoogleApiKey) {
        var baseUrl = 'https://www.googleapis.com/youtube/v3/';
        return {
            getVideo: function (id) {
                return $http.get(baseUrl + 'videos?id=' + id + '&key=' + GoogleApiKey.apiKey + '&part=snippet,statistics')
            }
        }
    })

    // Service for caching data with local storage
    .factory("Cache", function (localStorageService) {
        var videoList = 'videoList';
        return {
            setVideoList: function (list) {
                localStorageService.set(videoList, list);
            },
            getVideoList: function () {
                return localStorageService.get(videoList);
            }
        }
    });
