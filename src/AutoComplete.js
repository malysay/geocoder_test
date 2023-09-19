import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Papa from 'papaparse'; // Библиотека для чтения CSV/TSV файлов

class AutoSuggestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      addresses: [], // Здесь будут храниться адреса из эксель файла
    };
  }

  componentDidMount() {
    // Загрузка адресов из эксель файла (замените 'addresses.csv' на путь к вашему файлу)
    fetch('src/services/address.csv')
      .then((response) => response.text())
      .then((data) => {
        const result = Papa.parse(data, { header: true });
        console.log(result)
        this.setState({ addresses: result.data });
      })
      .catch((error) => {
        console.error('Ошибка загрузки адресов:', error);
      });
  }

  getSuggestions = (value) => {
    const { addresses } = this.state;

    // Фильтрация адресов на основе введенного значения
    const filteredAddresses = addresses.filter((address) => {
      const fullAddress = `${address.city}, ${address.street} ${address.building}`;
      console.log(fullAddress.toLowerCase().includes(value.toLowerCase()))
      return fullAddress.toLowerCase().includes(value.toLowerCase());
    });

    return filteredAddresses;
  };

  getSuggestionValue = (suggestion) => {
    const fullAddress = `${suggestion.city}, ${suggestion.street} ${suggestion.building}`;
    return fullAddress;
  };

  renderSuggestion = (suggestion) => (
    <div>{`${suggestion.city}, ${suggestion.street} ${suggestion.building}`}</div>
  );

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const suggestions = this.getSuggestions(value);
    this.setState({
      suggestions,
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Введите адрес для поиска',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutoSuggestComponent;
