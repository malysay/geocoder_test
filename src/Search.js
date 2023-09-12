import React, { useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

function Search({ onResultSelected }) {
  const [searchText, setSearchText] = useState('');
  const provider = new OpenStreetMapProvider();

  const handleSearch = async () => {
    if (searchText) {
      const results = await provider.search({ query: searchText });
      onResultSelected(results);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Введите адрес"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
}

export default Search;
