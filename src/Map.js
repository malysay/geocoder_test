import React, { useRef, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useMap, MapContainer, TileLayer, Marker } from 'react-leaflet';
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function Map() {
  const mapRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const map = useMap();

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = map;

      // Добавление слоя карты
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Создание поискового провайдера
      const provider = new OpenStreetMapProvider();

      // Создание поискового контрола
      const searchControl = new SearchControl({
        provider,
        position: 'topright',
        showMarker: true,
        showPopup: false,
        marker: {
          icon: new L.Icon.Default(),
          draggable: false,
        },
        maxMarkers: 1,
        autoCollapse: true,
        retainZoomLevel: false,
        animateZoom: true,
        searchLabel: 'Поиск адреса...',
        notFoundMessage: 'Адрес не найден',
        messageHideDelay: 3000,
        animate: true,
      });

      // Добавление поискового контрола к карте
      map.addControl(searchControl);
      
      // Обработчик выбора адреса
      map.on('geosearch/showlocation', (e) => {
        const { lat, lng } = e.Location;
        setSelectedAddress(e.Location.label);
        map.setView([lat, lng], 13);
      });
    }
  }, [map]);

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '80vh' }}></div>
      <div>
        {selectedAddress && <p>Выбранный адрес: {selectedAddress}</p>}
      </div>
    </div>
  );
}

export default Map;


// import React, { useRef, useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import { useMap } from 'react-leaflet';
// import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// import { Typeahead } from 'react-bootstrap-typeahead';

// import 'react-bootstrap-typeahead/css/Typeahead.css'; // Импортируйте стили для Typeahead

// function Map() {
//   const mapRef = useRef(null);
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState('');
//   const map = useMap();

//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = map;

//       // Добавление слоя карты
//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       }).addTo(map);
//     }
//   }, [map]);

//   const handleSearch = (query) => {
//     const provider = new OpenStreetMapProvider();
//     provider.search({ query })
//       .then((results) => {
//         setSearchResults(results);
//       })
//       .catch((error) => {
//         console.error(error);
//         setSearchResults([]);
//       });
//   };

//   const handleResultSelect = (selected) => {
//     if (selected.length > 0) {
//       const { x, y } = selected[0];
//       map.setView([y, x], 13);
//       setSelectedAddress(selected[0].label);
//     }
//   };

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <Typeahead
//           id="address-search"
//           labelKey="label"
//           options={searchResults}
//           placeholder="Введите адрес"
//           onChange={handleResultSelect}
//           onInputChange={handleSearch}
//         />
//         <button onClick={() => setSelectedAddress('')}>Сбросить</button>
//       </div>
//       <div id="map" style={{ width: '100%', height: '80vh' }}></div>
//       <div>
//         {selectedAddress && <p>Выбранный адрес: {selectedAddress}</p>}
//       </div>
//     </div>
//   );
// }

// export default Map;