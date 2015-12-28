angular.module('app').controller('mvDistrictMapCtrl', function($scope) {
    $scope.hideLeftSideBar=function(){
        $("#wrapper").toggleClass("active");
    };

    $("#wrapper").append('<input id="pac-input" type="text" placeholder="Search Box" class="controls">');
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
            $scope.hideLeftSideBar();
        });

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
            suppressInfoWindows: false,
            query: {
                select: "geometry",
                from: "1SrXwpE80AEmxngiFSKt9CFgwluhnQreIdbTdOG0Y"
            },
            map: map,
            styleId: 2,
            templateId: 1
        });
    };

    $scope.initmap();
});
