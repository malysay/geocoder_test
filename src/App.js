import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import MapLogic from './mainScreen/MapLogic';
import HeaderFooter from './HeaderFooter';
// import { Container, Row, Col } from 'react-bootstrap';


function App() {
  return (
    <div className="App d-flex flex-column"> {/*className="App"*/}
      <HeaderFooter />
      <MapLogic />
    </div>
  );
}

export default App;