import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import addressesData from './services/addressjson.json';

class AddressAutoSuggest extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  // Метод для получения подсказок на основе введенного значения
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : addressesData.filter((address) =>
          `${address.street} ${address.building} ${address.apartment} ${address.city}`
            .toLowerCase()
            .slice(0, inputLength) === inputValue
        );
  };

  // Метод для отображения подсказки
  getSuggestionValue = (suggestion) =>
    `${suggestion.street} ${suggestion.building} ${suggestion.apartment} ${suggestion.city}`;

  // Рендеринг подсказки
  renderSuggestion = (suggestion) => (
    <div>{`${suggestion.street} ${suggestion.building} ${suggestion.apartment} ${suggestion.city}`}</div>
  );

  // Обработчик изменения ввода
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
    this.props.onQueryChange(newValue);
  };

  // Метод вызывается при запросе подсказок
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Метод вызывается при очистке подсказок
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Настройки для компонента Autosuggest
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
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AddressAutoSuggest;
