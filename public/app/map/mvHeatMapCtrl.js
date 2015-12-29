angular.module('app').controller('mvHeatMapCtrl', function($scope,$http) {
    //$scope.initmap= function () {
    //
    //    map = new google.maps.Map(document.getElementById('page-content-wrapper'), {
    //        center: new google.maps.LatLng(54.75577249622124, -127.82632013134764),
    //        zoom: 4
    //    });
    //
    //    $scope.data = null;
    //    var script = document.createElement('script');
    //    script.setAttribute('src',
    //        'https://storage.googleapis.com/maps-devrel/quakes.geo.json');
    //    document.getElementsByTagName('head')[0].appendChild(script);
    //
    //    map.data.setStyle(function(feature) {
    //        var mag = Math.exp(parseFloat(feature.getProperty('mag'))) * 0.1;
    //        return /** @type {google.maps.Data.StyleOptions} */({
    //            icon: {
    //                path: google.maps.SymbolPath.CIRCLE,
    //                scale: mag,
    //                fillColor: '#f00',
    //                fillOpacity: 0.35,
    //                strokeWeight: 0
    //            }
    //        });
    //    });
    //    window.eqfeed_callback = function(data) {
    //        //$scope.data = data;
    //        map.data.addGeoJson(data);
    //    };
    //};
    //$scope.initmap();
    $scope.hideLeftSideBar=function(){
        console.log('being clicked');
        $("#wrapper").toggleClass("active");
    };

    $("#wrapper").append('<input id="pac-input" type="text" placeholder="Search Box" class="controls">');

    $("#wrapper").append('<div id="legend" class="alert alert-danger "><ul>2015<li>Green: Schools Reached</li><li>Red: Schools Unreached</li> </ul> </div>');
    //$("#wrapper").append('<div class="alert alert-warning alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> <strong>Warning!</strong> Better check yourself, youre not looking too good. </div>');

    //var str="Subir"
    //$("#content").html(str);// ="Subir";

    $scope.initmap= function () {

        window.map = new google.maps.Map(document.getElementById('page-content-wrapper'), {
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
            //cminZoom: 5,
            //maxZoom: 15,
            streetViewControl: true,
            panControl: false,
            mapTypeControl: true,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        });
        window.map.addListener('click', function() {
            //searchBox.setBounds(map.getBounds());
            console.log('clicked');
            $scope.hideLeftSideBar();
        });

        window.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
            document.getElementById('legend'));


        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        window.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        window.map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });
        var markers = [];
        // [START region_getplaces]
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            // Clear out the old markers.
            markers.forEach(function(marker) {
                marker.setMap(null);
            });
            markers = [];

            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        window.layer_0 = new google.maps.FusionTablesLayer({
            suppressInfoWindows: true,
            query: {
                select: "geometry",
                from: "1SrXwpE80AEmxngiFSKt9CFgwluhnQreIdbTdOG0Y"
            },
            map: map,
            styleId: 2,
            templateId: 1
        });


        window.layer_2 = new google.maps.FusionTablesLayer({
            query: {
                select: "School Name",
                from: "1VOA48Jwn7NPYsxEuitp9wrpoitQ1iVWLFrpf-ziN"
            },
            map: map,
            optimized: false,
            styleId: 1,
            templateId: 2
        });

        window.layer_1 = new google.maps.FusionTablesLayer({
            map: map,
            heatmap: { enabled: false },
            //optimized: false,
            query: {
                select: "col1",
                from: "1-k-EwF6WKlmehVPml1q8zPjrqI_Fxm-kfTiS0eTZ",
                where: "col0 =2015"
            },
            styleId: 1,
            templateId: 2,
            styles: [
                { where: "",
                    markerOptions: {
                        iconName: 'large_green'
                    }
                }],
        });
        //google.maps.event.addListener(window.layer_1, 'click', function(e) {
        //    console.log('e',e);
        //    var str=e.row.School.value;
        //    $("#content").html(str);
        //
        //});

    };

    $scope.initmap();
});
