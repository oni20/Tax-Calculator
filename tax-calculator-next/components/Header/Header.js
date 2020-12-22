import React, { useState } from 'react';

const Header = props => {
  const toggleLanguage = event => {
    event.preventDefault();
    props.handleLanguageToggle(props.language == "en" ? "fr" : "en")
  }

  return (
    <nav className="green" role="navigation">
      <div className="nav-wrapper container">
        <a id="logo-container" href="#" className="brand-logo">
          {props.headerTitle}
        </a>
        <ul className="right hide-on-med-and-down">
          <li>
            <a href="#" onClick={toggleLanguage}>
              <i className="material-icons left">translate</i>
              {props.language == "en" ? "Français" : "English"}
            </a>
          </li>
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li>
            <a href="#" onClick={toggleLanguage}>
              {props.language == "en" ? "Français" : "English"}
            </a>
          </li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
    </nav>
  )
}

export default Header;
