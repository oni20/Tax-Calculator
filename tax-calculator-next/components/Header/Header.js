import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './languageToggle.scss';

const Header = props => {
  const toggleLanguage = event => {
    event.preventDefault();
    props.handleLanguageToggle(props.language == "en" ? "fr" : "en")
  }

  return (
  <Container fluid className="no-padding">
  <Row noGutters>
  <Col xs={12}>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      {props.headerTitle}
      </Navbar.Brand>
      <div className="d-flex w-100 justify-content-end align-items-center">
      <ul class="site-header__language-container">
      <li class="site-header__language-item">
            <button class="site-header__language-link site-header__language-link--active" href="">EN</button>
      </li>
      <li>
            <button class="site-header__language-link">FR</button>
      </li>
      </ul>
      </div>
  </Navbar>
  </Col>
  </Row>
  </Container>
    // <nav className="green" role="navigation">
    //   <div className="nav-wrapper container">
    //     <a id="logo-container" href="#" className="brand-logo">
    //       {props.headerTitle}
    //     </a>
    //     <ul className="right hide-on-med-and-down">
    //       <li>
    //         <a href="#" onClick={toggleLanguage}>
    //           <i className="material-icons left">translate</i>
    //           {props.language == "en" ? "Français" : "English"}
    //         </a>
    //       </li>
    //     </ul>

    //     <ul id="nav-mobile" className="sidenav">
    //       <li>
    //         <a href="#" onClick={toggleLanguage}>
    //           {props.language == "en" ? "Français" : "English"}
    //         </a>
    //       </li>
    //     </ul>
    //     <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
    //   </div>
    // </nav>
  )
}

export default Header;
