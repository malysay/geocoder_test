import React, { Component } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { Container, Row, Col } from "react-bootstrap";
import AddressAutoSuggest from "./AddressAutoSuggest";
import MapComponent from "./Map";
import Slider from "./Slider";

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
          <Col xs={12} md={3}>
            <Slider />
          </Col>
          <Col xs={12} md={9} style={{ position: "relative" }}>
            <AddressAutoSuggest
              query={query}
              onQueryChange={this.handleQueryChange}
            />
            <button onClick={this.handleSearch}>Поиск</button>
            <MapComponent searchResult={searchResult} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MapLogic;
