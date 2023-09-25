import React, { Component } from "react";
import { Collapse, Button, Card } from "react-bootstrap";
import SliderLogic from "./SliderLogic";
import { BiChevronDoubleLeft, BiChevronDoubleRight } from "react-icons/bi";

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  toggleSlider = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <Button
          onClick={this.toggleSlider}
          style={{ marginRight: "10px" }}
          variant="light"
        >
          {this.state.isOpen ? <BiChevronDoubleLeft /> : <BiChevronDoubleRight />}
        </Button>
        <div style={{ minHeight: "150px" }}>
          <Collapse in={this.state.isOpen} dimension="width">
            <Card body style={{ width: "400px" }}>
              <SliderLogic />
            </Card>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default Slider;
