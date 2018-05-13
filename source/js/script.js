"use strict"

var googleMap = document.querySelector('.contacts__google-map');
var mapLink = document.querySelector('.contacts__map');
var burger =  document.querySelector('.main-nav__burger');
var menu =  document.querySelector('.main-nav__list');

burger.addEventListener('click', function (evt) {
  burger.classList.toggle("main-nav__burger--closed");
  menu.classList.toggle("main-nav__list--show");
});

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

document.addEventListener("DOMContentLoaded", function() {
  burger.classList.toggle("main-nav__burger--closed");
  menu.classList.toggle("main-nav__list--show");
});
