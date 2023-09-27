import React, { Component } from "react";
import { Tab, Button } from "react-bootstrap";
import SidePanelLogic from "./SidePanelLogic";

class SidePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false, // Состояние для открытия/закрытия SidePanel
    };
  }

  togglePanel = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div
        style={{
          width: isOpen ? "40%" : "40px", // Устанавливаем ширину в зависимости от состояния
          position: "absolute",
          top: "56px",
          bottom: 0,
          height: "calc(100vh - 56px - 56px)",
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
          overflowY: "auto",
          zIndex: 402,
          transition: "width 0.3s", // Добавляем анимацию для плавного изменения ширины
        }}
      >
        {isOpen && (
          <Tab.Container>
            <Tab.Content>
              <SidePanelLogic />
            </Tab.Content>
          </Tab.Container>
        )}
        <Button
          onClick={this.togglePanel}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="blue"
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
              fill="blue"
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

export default SidePanel;
