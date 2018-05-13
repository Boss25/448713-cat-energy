
var googleMap = document.querySelector('.contacts__google-map');
var mapLink = document.querySelector('.contacts__map');

googleMap.classList.toggle("visually-hidden");
mapLink.classList.toggle("visually-hidden");

mapLink.addEventListener('click', function (evt) {
  evt.preventDefault();
});

function initMap() {
  var myLatLng = {lat: 59.938818, lng: 30.323312};
  map = new google.maps.Map(googleMap, {
    zoom: 17,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'CatEnergyHere!'
  });
}
