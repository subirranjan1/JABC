angular.module('app', ['ngResource', 'ngRoute','ngMap']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', { templateUrl: '/partials/main-schoolnotreached',controller:'mvSchoolNotReachedCtrl'})
        .when('/HeatMap', { templateUrl: '/partials/main-heatmap', controller: 'mvHeatMapCtrl'})
        .when('/Chart', { templateUrl: '/partials/main-chart', controller: 'mvChartCtrl'})
        .when('/DistrictMap', { templateUrl: '/partials/main-districtmap', controller: 'mvDistrictMapCtrl'});
});

