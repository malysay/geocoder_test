import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PeliasSearch from 'pelias-leaflet-plugin';
import 'pelias-leaflet-plugin/dist/pelias-leaflet-plugin.css'; // Импорт стилей Pelias
import 'typeahead.js/dist/typeahead.jquery.min.js'; // Импорт Typeahead.js
import 'typeahead.js/dist/typeahead.css'; // Импорт стилей Typeahead.js

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([62.0338900, 129.7330600], 13);

      // Добавление слоя карты
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Создание геокодера Pelias с автозаполнением
      const searchControl = PeliasSearch.control({
        position: 'topright',
        useMarker: true,
        placeholder: 'Search for a location', // Текст placeholder
        fullWidth: true, // Растягивает поле по ширине
        bounds: mapRef.current.getBounds(), // Ограничивает поиск областью видимости карты
      });

      // Добавление геокодера на карту
      searchControl.addTo(mapRef.current);
    }
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '80vh' }}></div>
  );
}

export default Map;
