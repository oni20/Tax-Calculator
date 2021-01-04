import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

/* Import custom stylesheet */
import HeaderStyle from '../../styles/Header.module.css';

const Header = props => {

  const handleSelect = (eventKey) => props.handleLanguageToggle(props.language == "en" ? "fr" : "en");

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="green">
      <Navbar.Brand href="#home" className="brand-logo">{props.headerTitle}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav activeKey="1" onSelect={handleSelect}>
          <Nav.Link eventKey="1" href="#">
            <i className="material-icons mar-right-5">translate</i>
            {props.language == "en" ? "Français" : "English"}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;
