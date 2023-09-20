import React, { Component } from 'react';
import './App.css';
import MapComponent from './Map';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import AddressAutoSuggest from './AddressAutoSuggest';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '', // Здесь будет храниться запрос пользователя
      searchResult: null, // Здесь будут храниться результаты геокодирования
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
        console.log(result)
        this.setState({ searchResult: result });
      })
      .catch((error) => {
        console.error('Ошибка геокодирования:', error);
      });
  };

  render() {
    const { searchResult, query } = this.state;

    return (
      <div className="App">
        <h1>Leaflet Map Example</h1>
        <div>
          {/* <input
            type="text"
            placeholder="Введите адрес для поиска"
            value={this.state.query}
            onChange={this.handleQueryChange}
          /> */}
          {/* Используйте компонент AddressAutoSuggest вместо обычного input */}
          <AddressAutoSuggest query={query} onQueryChange={this.handleQueryChange} />
          <button onClick={this.handleSearch}>Поиск</button>
        </div>
        <main>
          <MapComponent searchResult={searchResult} />
        </main>
      </div>
    );
  }
}

export default App;