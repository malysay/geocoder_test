import React, { Component } from "react";
import { Collapse, Button, Card } from "react-bootstrap";
import SliderLogic from "./SliderLogic";

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
      <div style={{ display: "flex" }}>
        <div style={{ minHeight: "150px", flex: 1 }}>
          <Collapse in={this.state.isOpen} dimension="width">
            <Card body style={{ width: "400px" }}>
              <SliderLogic />
            </Card>
          </Collapse>
        </div>
        {/* Кнопка "Закрыть" слева */}
        <Button
          onClick={this.toggleSlider}
          style={{ marginRight: "10px" }}
          variant="light"
        >
          {this.state.isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-double-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
              />
              <path
                fillRule="evenodd"
                d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          )}
        </Button>
      </div>
    );
  }
}

export default Slider;
