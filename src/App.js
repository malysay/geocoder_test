import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container } from "react-bootstrap";

import MapLogic from "./mainScreen/MapLogic";

function App() {
  return (
    <div className="App d-flex flex-column">
      {/*className="App"*/}
      <Navbar bg="sky" variant="dark">
        <Container>
          <Navbar>Testoviy HEADER</Navbar>
        </Container>
      </Navbar>
      <MapLogic />
      <footer className="bg-dark text-light text-center py-3">
        Testoviy FOOTER || © 2023 Leaflet Map Example
      </footer>
    </div>
  );
}

export default App;
