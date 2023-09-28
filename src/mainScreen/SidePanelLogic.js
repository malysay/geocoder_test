import React, { Component } from "react";
import { Tab, Tabs, Card, Button } from "react-bootstrap";

import tasksData from "../services/task.json";
import engineersData from "../services/user.json";

class SidePanelLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "tasks", // активная вкладка по умолчанию
    };
  }

  handleTabSelect = (key) => {
    this.setState({ activeKey: key });
  };

  // PRIMER DANNIH
  renderTasks = () => {
    return (
      <div>
        {tasksData.data.map((task) => (
          <Card key={task.id} className="mb-3">
            <Card.Body>
              <Card.Title>{task.statusTask}</Card.Title>
              <Card.Text>
                <strong>Адрес (пока что id):</strong> {task.id_object}
                <br />
                {task.breakingReason}
                <br />
                {task.createdDate}
                <br />
              </Card.Text>
              <Button variant="primary">Действие 1</Button>{" "}
              <Button variant="secondary">Действие 2</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  renderEngineers = () => {
    return (
      <div>
        {engineersData.data.map((engineer) => (
          <Card key={engineer.id} className="mb-3">
            <Card.Body>
              <Card.Title>
                {engineer.firstName} {engineer.middleName} {engineer.lastName}
              </Card.Title>
              <Card.Text>
                <strong>Задач (id):</strong> {engineer.id}
              </Card.Text>
              <Button variant="primary">Действие 1</Button>{" "}
              <Button variant="secondary">Действие 2</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  render() {
    const { activeKey } = this.state;

    return (
      <Tabs
        activeKey={activeKey}
        onSelect={this.handleTabSelect}
        fill
        style={{ flex: 1 }}
      >
        <Tab
          eventKey="tasks"
          title="Заявки"
          style={{ flex: 1, maxHeight: "80vh", overflowY: "auto" }}
        >
          {this.renderTasks()}
        </Tab>
        <Tab
          eventKey="engineers"
          title="Инженеры"
          style={{ flex: 1, maxHeight: "80vh", overflowY: "auto" }}
        >
          {this.renderEngineers()}
        </Tab>
      </Tabs>
    );
  }
}

export default SidePanelLogic;
