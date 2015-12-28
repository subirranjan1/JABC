angular.module('app').controller('mvMapCtrl', function($scope,$http,$interval) {



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

        $scope.onMouseover = function(event) {
            var fillArray = ['red', 'blue', 'yellow', 'green'];
            var style = this.getFeatureStyle(event.featureId);
            style.fillColor = fillArray[event.featureId - 1];
            style.fillOpacity = '0.8';
        };
        $scope.onMouseout = function(event) {
            var style = this.getFeatureStyle(event.featureId).resetAll();
        };



    });
});