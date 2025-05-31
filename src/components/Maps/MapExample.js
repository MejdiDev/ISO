import React, { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "VOTRE_CLÉ_API"; // Remplace ici !

function MapExample() {
  const mapRef = useRef(null);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    // Charger les données depuis ton backend
    fetch("http://localhost:5000/api/maps")
      .then((res) => res.json())
      .then((data) => setSites(data));
  }, []);

  useEffect(() => {
    if (sites.length === 0) return;

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    loader.load().then(() => {
      const google = window.google;

      const map = new google.maps.Map(mapRef.current, {
        zoom: 5,
        center: new google.maps.LatLng(46.5, 2.2), // centre France
        scrollwheel: false,
        zoomControl: true,
      });

      sites.forEach((site) => {
        const position = new google.maps.LatLng(site.lat, site.lng);

        const marker = new google.maps.Marker({
          position,
          map,
          title: site.nom,
          animation: google.maps.Animation.DROP,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div><h3>${site.nom}</h3><p>${site.description}</p></div>`,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      });
    });
  }, [sites]);

  return (
    <div className="relative w-full rounded h-600-px">
      <div className="rounded h-full" ref={mapRef} />
    </div>
  );
}

export default MapExample;
