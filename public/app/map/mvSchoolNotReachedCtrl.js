angular.module('app').controller('mvSchoolNotReachedCtrl', function($scope) {
    $scope.hideLeftSideBar=function(){
            $("#wrapper").toggleClass("active");
    };

    $("#wrapper").append('<input id="pac-input" type="text" placeholder="Search Box" class="controls">');
    $("#wrapper").append('<div><select id="legend"> <option value="">--Select Year--</option> <option value="2006">2006</option><option value="2007">2007</option><option value="2008">2008</option><option value="2009">2009</option><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option> <option value="2015">2015</option></select></div>');

    function initialize() {
        var tableId = '1-k-EwF6WKlmehVPml1q8zPjrqI_Fxm-kfTiS0eTZ';
        var locationColumn = 'col1';

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
            $scope.hideLeftSideBar();
        });

        window.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
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

        var layer = new google.maps.FusionTablesLayer({
            query: {
                select: locationColumn,
                from: tableId
            },
            styles: [
                { where: "",
                    markerOptions: {
                        iconName: 'small_red'
                    }
                }],
            map: map
        });
        //window.layer_2 = new google.maps.FusionTablesLayer({
        //    query: {
        //        select: "School Name",
        //        from: "1VOA48Jwn7NPYsxEuitp9wrpoitQ1iVWLFrpf-ziN"
        //    },
        //    map: map,
        //    optimized: false,
        //    styleId: 1,
        //    templateId: 2
        //});
        google.maps.event.addDomListener(document.getElementById('legend'),
            'change', function() {
                updateMap(layer, tableId, locationColumn);
            });
    }

    // Update the query sent to the Fusion Table Layer based on
    // the user selection in the select menu
    function updateMap(layer, tableId, locationColumn) {
        var delivery = document.getElementById('legend').value;
        if (delivery) {
            layer.setOptions({
                query: {
                    select: locationColumn,
                    from: tableId,
                    where: "col0 = '" + delivery + "'"
                }
            });
        } else {
            layer.setOptions({
                query: {
                    select: locationColumn,
                    from: tableId
                }
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    }



    $scope.initmap=function(){
        initialize();
    };

    $scope.initmap();

});
