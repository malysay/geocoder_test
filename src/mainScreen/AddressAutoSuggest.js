import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import addressesData from "../services/addressjson.json";

class AddressAutoSuggest extends Component {
  constructor() {
    super();

    this.state = {
      selected: [],
    };
  }

  // метод для получения подсказок на основе введенного значения
  getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : addressesData.filter(
          (address) =>
            `${address.street} ${address.building} ${address.apartment} ${address.city}`
              .toLowerCase()
              .slice(0, inputLength) === inputValue
        );
  };

  // метод для обработки выбора подсказки
  handleSelect = (selected) => {
    this.setState({ selected });
    this.props.onQueryChange(selected[0] || ""); // Передаем значение в родительский компонент
  };

  render() {
    const { selected } = this.state;

    return (
      <div style={{ width: "400px" }}>
        <Typeahead
          labelKey={(option) =>
            `${option.street} ${option.building} ${option.apartment} ${option.city}`
          }
          options={addressesData}
          placeholder="Введите адрес"
          selected={selected}
          onChange={this.handleSelect}
        />
      </div>
    );
  }
}

export default AddressAutoSuggest;
