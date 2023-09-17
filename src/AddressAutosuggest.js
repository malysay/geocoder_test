import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

class AddressAutosuggest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  // Функция для получения подсказок на основе введенного текста
  getSuggestions = async (value) => {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: value });
    return results.map((result) => ({
      label: result.label,
      coordinates: [result.y, result.x],
    }));
  };

  // Обработчик изменения ввода
  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  // Обработчик выбора подсказки
  onSuggestionSelected = (event, { suggestion }) => {
    // Вызовите функцию, чтобы обработать выбор адреса
    this.props.onAddressSelected(suggestion);
  };

  // Функция для отображения подсказок
  renderSuggestion = (suggestion) => (
    <div>{suggestion.label}</div>
  );

  // Обработчик для получения подсказок при вводе
  onSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value).then((suggestions) => {
      this.setState({
        suggestions,
      });
    });
  };

  // Обработчик для очистки подсказок при очистке ввода
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Введите адрес',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={(suggestion) => suggestion.label}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AddressAutosuggest;
