import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
} from "react-leaflet";
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
      <div
        style={{
          height: "calc(100vh - 56px - 56px)", // 100vh минус высота хедера и футера
        }}
      >
        <MapContainer
          ref={(ref) => {
            this.mapRef = ref;
          }}
          center={position}
          zoom={mapZoom}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
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
          <div
          // style={{
          //   position: "absolute",
          //   top: "50%", // Вы можете настроить вертикальное положение контролов здесь
          //   right: "10px", // Вы можете настроить горизонтальное положение контролов здесь
          //   transform: "translateY(-50%)", // Вертикальная центровка
          // }}
          >
            <ZoomControl position="bottomright" />
          </div>
        </MapContainer>
      </div>
    );
  }
}

export default MapComponent;
