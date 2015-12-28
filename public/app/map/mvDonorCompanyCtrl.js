angular.module('app').controller('mvDonorCompanyCtrl', function($scope,$http,$interval) {
    $scope.$on('mapInitialized', function(event, map) {


        var resize = function(){
            var $mapWrapper = $('map').children('div');
            var windowHeihgt = $(window).height();
            $mapWrapper.css('height', (windowHeihgt - 80) + 'px');
        }
        $(window).on('resize', function(){
            resize();
        })

        $(window).trigger('resize');
        google.maps.event.trigger(map,'resize')

        $scope.styleFunc  = function(feature) {
            heatmap.set('radius', heatmap.get('radius') ? null : 5000);
            var mag = Math.exp(parseFloat(feature.getProperty('mag'))) * 0.1;
            return /** @type {google.maps.Data.StyleOptions} */({
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 2,
                    fillColor: '#f00',
                    fillOpacity: 0.35,
                    strokeWeight: 0
                }
            });
        }
        //$interval( $scope.GenerateMapMarkers, 2000);
    });
});