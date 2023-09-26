import React, { useState } from "react";
import { Tab } from "react-bootstrap";
import SliderLogic from "./SidePanelLogic"; // Импортируйте ваш компонент SliderLogic

const SidePanel = () => {
  const [activeKey, setActiveKey] = useState("tab1");

  return (
    <div
      style={{
        width: "300px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: "#fff",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <Tab.Container
        activeKey={activeKey}
        onSelect={(key) => setActiveKey(key)}
      >
        <Tab.Content>
          <SliderLogic /> {/* Вставляем SliderLogic */}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default SidePanel;
