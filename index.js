function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 5,
      center: { lat: 37.7749, lng: -122.4194 }
  });

  const input = document.getElementById("search-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
  });

  let markers = [];
  searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
          return;
      }

      markers.forEach((marker) => marker.setMap(null));
      markers = [];

      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
              console.log("Returned place contains no geometry");
              return;
          }

          const marker = new google.maps.Marker({
              map,
              title: place.name,
              position: place.geometry.location,
          });

          markers.push(marker);

          if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
          } else {
              bounds.extend(place.geometry.location);
          }
      });
      map.fitBounds(bounds);
  });
}

window.initMap = initMap;
