import React, { Component } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Container, Row } from "react-bootstrap";
import AddressAutoSuggest from "./AddressAutoSuggest";
import MapComponent from "./Map";
import SidePanel from "./SidePanel";

class MapLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "", // здесь будет храниться запрос пользователя
      searchResult: null, // здесь будут храниться результаты геокодирования
    };
  }

  handleQueryChange = (newValue) => {
    this.setState({ query: newValue });
  };

  handleSearch = () => {
    const { query } = this.state;
    const provider = new OpenStreetMapProvider();

    // геокодирование
    provider
      .search({ query })
      .then((result) => {
        console.log(result);
        this.setState({ searchResult: result });
      })
      .catch((error) => {
        console.error("Ошибка геокодирования:", error);
      });
  };

  render() {
    const { searchResult, query } = this.state;

    return (
      <Container fluid className="flex-grow-1">
        <Row className="flex-grow-1">
          <div
            style={{
              position: "absolute",
              padding: "10px",
              zIndex: 401,
            }}
          >
            {/* Поле поиска и кнопка */}
            <AddressAutoSuggest
              query={query}
              onQueryChange={this.handleQueryChange}
            />
            <button onClick={this.handleSearch}>Поиск</button>
          </div>
          <SidePanel />
          <MapComponent searchResult={searchResult} />
        </Row>
      </Container>
    );
  }
}

export default MapLogic;
