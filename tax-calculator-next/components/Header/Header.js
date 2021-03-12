import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

/* Custom Component */
import { GlobalContext } from '../Context/GlobalContext';

const Header = () => {
  const { language, content, toggleLanguage } = useContext(GlobalContext),
    handleSelect = () => toggleLanguage(language == 'en' ? 'fr' : 'en');
    
  return (
    <Navbar collapseOnSelect expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand href='#home' className='brand-logo'>
          <img
            src={content.header.logoUrl}
            width='133px'
            className='d-inline-block align-top'
            alt={content.header.logoAlt}
          /></Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
          <Nav activeKey='1' onSelect={handleSelect}>
            <Nav.Link eventKey='1' href='#'>
              <i className='material-icons mar-right-5'>translate</i>
              {language == 'en' ? 'Français' : 'English'}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
