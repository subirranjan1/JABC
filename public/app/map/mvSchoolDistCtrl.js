angular.module('app').controller('mvSchoolDistCtrl', function($scope,$http,$interval) {
    $scope.$on('mapInitialized', function(event, map) {


        var resize = function(){
            var $mapWrapper = $('map').children('div');
            var windowHeihgt = $(window).height();
            $mapWrapper.css('height', (windowHeihgt - 80) + 'px');
        };
        $(window).on('resize', function(){
            resize();
        });

        $(window).trigger('resize');
        google.maps.event.trigger(map,'resize');

        //$interval( $scope.GenerateMapMarkers, 2000);
    });
});