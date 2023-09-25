import React from "react";
import { Navbar, Container } from "react-bootstrap";

const HeaderFooter = () => {
  return (
    <div className="d-flex flex-column flex-grow-0">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar>Testoviy HEADER</Navbar>
        </Container>
      </Navbar>
      <footer className="bg-dark text-light text-center py-3">
        Testoviy FOOTER || © 2023 Leaflet Map Example
      </footer>
    </div>
  );
};

export default HeaderFooter;
