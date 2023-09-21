import React, { Component } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

class MapComponent extends Component {
  componentDidMount() {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
    });

    if (this.mapRef) {
      // ожидание создания MapContainer
      this.mapRef.whenCreated((map) => {
        map.addControl(searchControl);
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { searchResult } = this.props;

    // проверяем, изменились ли результаты поиска
    if (
      searchResult !== prevProps.searchResult &&
      searchResult &&
      searchResult.length > 0
    ) {
      // получаем координаты первого результата (первого местоположения)
      const firstResult = searchResult[0];
      const newPosition = [firstResult.y, firstResult.x];
      const newZoom = 16;

      // плавное перемещение карты к новому местоположению с анимацией
      this.mapRef.flyTo(newPosition, newZoom, {
        duration: 1, // длительность анимации в секундах
      });
    }
  }

  render() {
    const { searchResult } = this.props;
    const position = [62.03389, 129.73306]; // начальные координаты карты
    const mapZoom = 13;

    return (
      <MapContainer
        ref={(ref) => {
          this.mapRef = ref;
        }}
        center={position}
        zoom={mapZoom}
        style={{ width: "80%", height: "800px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {searchResult &&
          searchResult.map((result, index) => (
            <CircleMarker
              center={[result.y, result.x]}
              radius={10}
              color="blue"
              fillColor="cyan"
              fillOpacity={0.6}
            >
              <Popup>{result.label}</Popup>
            </CircleMarker>
          ))}
      </MapContainer>
    );
  }
}

export default MapComponent;
