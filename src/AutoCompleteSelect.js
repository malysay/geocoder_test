import React, { Component } from 'react';
import Select from 'react-select';

class AutoCompleteSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
    };
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  render() {
    const { selectedOption } = this.state;
    const { options, placeholder } = this.props;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder={placeholder}
      />
    );
  }
}

export default AutoCompleteSelect;
