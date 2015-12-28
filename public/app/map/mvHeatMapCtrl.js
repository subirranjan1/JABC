angular.module('app').controller('mvHeatMapCtrl', function($scope,$http) {
    $scope.initmap= function () {

        map = new google.maps.Map(document.getElementById('page-content-wrapper'), {
            center: new google.maps.LatLng(54.75577249622124, -127.82632013134764),
            zoom: 4
        });

        $scope.data = null;
        var script = document.createElement('script');
        script.setAttribute('src',
            'https://storage.googleapis.com/maps-devrel/quakes.geo.json');
        document.getElementsByTagName('head')[0].appendChild(script);

        map.data.setStyle(function(feature) {
            var mag = Math.exp(parseFloat(feature.getProperty('mag'))) * 0.1;
            return /** @type {google.maps.Data.StyleOptions} */({
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: mag,
                    fillColor: '#f00',
                    fillOpacity: 0.35,
                    strokeWeight: 0
                }
            });
        });
        window.eqfeed_callback = function(data) {
            //$scope.data = data;
            map.data.addGeoJson(data);
        };
    };
    $scope.initmap();
});
