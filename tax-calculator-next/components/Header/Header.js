import React from 'react';
import { Navbar, Nav,Container } from 'react-bootstrap';

const Header = props => {

  const handleSelect = (eventKey) => props.handleLanguageToggle(props.language == "en" ? "fr" : "en");

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Container>
      <Navbar.Brand href="#home" className="brand-logo">
        <img
        src={props.logoUrl}
        width="133px"
        className="d-inline-block align-top"
        alt={props.logoAlt}
      /></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav activeKey="1" onSelect={handleSelect}>
          <Nav.Link eventKey="1" href="#">
            <i className="material-icons mar-right-5">translate</i>
            {props.language == "en" ? "Français" : "English"}  
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
