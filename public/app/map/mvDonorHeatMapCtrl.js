angular.module('app').controller('mvDonorHeatMapCtrl', function($scope,$http,$interval) {
    console.log('Controller runs');
    //$scope.count = 0;
    ////var map=this;
    // var resize = function(){
    // var $mapWrapper = $('main-wrapper'); // .children('div');
    // var windowHeihgt = $(window).height();
    // $mapWrapper.css('height', (windowHeihgt - 80) + 'px');
    // };
    // $(window).on('resize', function(){
    // resize();
    // });
    //
    // $(window).trigger('resize');
    //google.maps.event.trigger(map,'resize');

    $scope.initmap= function () {

        window.map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(54.75577249622124, -127.82632013134764),
            zoom: 6,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            backgroundColor: "#ffffff",
            keyboardShortcuts: true,
            scaleControl: false,
            disableDefaultUI: true,
            navigationControl: false,
            navigationControlOptions: {
                position: google.maps.ControlPosition.LEFT,
                style: google.maps.NavigationControlStyle.SMALL
            },
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            minZoom: 5,
            maxZoom: 15,
            streetViewControl: true,
            panControl: false,
            mapTypeControl: true,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        });


        window.layer_0 = new google.maps.FusionTablesLayer({
            query: {
                select: "geometry",
                from: "1SrXwpE80AEmxngiFSKt9CFgwluhnQreIdbTdOG0Y"
            },
            map: map,
            styleId: 2,
            templateId: 1
        });
        window.layer_1 = new google.maps.FusionTablesLayer({
            map: map,
            heatmap: { enabled: false },
            query: {
                select: "col1",
                from: "1-k-EwF6WKlmehVPml1q8zPjrqI_Fxm-kfTiS0eTZ",
                where: "col0 =2015"
            },
            styles: [
                { where: "col0 = 2015",
                    markerOptions: {
                        iconName: 'large_green'
                    }
                }]
        });
        window.layer_2 = new google.maps.FusionTablesLayer({
            query: {
                select: "Unreached",
                from: "1Yg_lfkIgT0RgQhqqb9nQpTJNTqlTg-vW7Gkyb1Ms"
            },
            map: map,
            styleId: 1,
            templateId: 2
        });
    };
    $scope.initmap();
});
