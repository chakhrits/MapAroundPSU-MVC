﻿var app = angular.module('myApp', ['uiGmapgoogle-maps']);
app.controller('mapController', function ($scope, $http) {

    //this is for default map focus when load first time
    $scope.map = { center: { latitude: 7.8936802, longitude: 98.3555521 }, zoom: 16 }

    $scope.markers = [];
    $scope.locations = [];

    //Populate all location
    $http.get('/home/GetAllLocation').then(function (data) {
        $scope.locations = data.data;
    }, function () {
        alert('Error');
    });

    //get marker info
    $scope.ShowLocation = function (locationID) {
        $http.get('/home/GetMarkerInfo', {
            params: {
                locationID: locationID
            }
        }).then(function (data) {
            //clear markers 
            $scope.markers = [];
            $scope.markers.push({
                id: data.data.LocationID,
                coords: { latitude: data.data.Lat, longitude: data.data.Long },
                phone: data.data.Phone,
                title: data.data.title,
                address: data.data.Address,
                image: data.data.ImagePath,
                price: data.data.Price,
                bed: data.data.Bed,
                wardrobe: data.data.Wardrobe,
                conditioner: data.data.Conditioner,
                desk: data.data.Desk,
                toilet: data.data.Toilet,
                refrigrator: data.data.Refrigrator,
                wifi: data.data.Wifi,
            });

            //set map focus to center
            $scope.map.center.latitude = data.data.Lat;
            $scope.map.center.longitude = data.data.Long;

        }, function () {
            alert('Error');
        });
    }

    //Show / Hide marker on map
    $scope.windowOptions = {
        show: true
    };

});
