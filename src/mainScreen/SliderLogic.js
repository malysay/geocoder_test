import React, { Component } from 'react';
import { Tab, Tabs, ListGroup } from 'react-bootstrap';
import addressesData from '../services/addressjson.json';

class SliderLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 'list1', // Устанавливаем активную вкладку по умолчанию
    };
  }

  handleTabSelect = (key) => {
    this.setState({ activeKey: key });
  }
  
  // PRIMER DANNIH
  renderAddresses = () => {
    return (
      <ListGroup>
        {addressesData.map((address, index) => (
          <ListGroup.Item key={index}>
            {`${address.street}, ${address.building}, ${address.apartment}, ${address.city}`}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }

  render() {
    const { activeKey } = this.state;

    return (
      <Tabs activeKey={activeKey} onSelect={this.handleTabSelect}>
        <Tab eventKey="list1" title="Заявки">
          {/* Ваш компонент для первого списка */}
          {this.renderAddresses()}
        </Tab>
        <Tab eventKey="list2" title="Инженеры">
          {/* Ваш компонент для второго списка */}
          ivan
          vanya
          vanek
        </Tab>
      </Tabs>
    );
  }
}

export default SliderLogic;