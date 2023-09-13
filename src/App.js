import React from "react";
import Map from "./Map";
import { MapContainer } from "react-leaflet";

function App() {
  return (
    <div className="App">
      <h1>Leaflet Map Example</h1>
      <MapContainer center={[62.0338900, 129.7330600]} zoom={13}>
        <Map />
      </MapContainer>
    </div>
  );
}

export default App;
