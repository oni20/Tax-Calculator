import React from 'react';

const Footer = props => {
  let copyrightText = props.footerContent.copyrightText.replace("$currYear$", new Date().getFullYear());

  return (
    <footer className="page-footer green">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">GoTax</h5>
            <p className="grey-text text-lighten-4">{props.footerContent.desc}</p>
          </div>
          <div className="col l3 s12">
            <h5 className="white-text">{props.footerContent.useFulLinkText}</h5>
            <span>This part is under construction</span>
            <ul>
              <li><a className="white-text" href="#!">Link 1</a></li>
              <li><a className="white-text" href="#!">Link 2</a></li>
            </ul>
          </div>
          <div className="col l3 s12">
            <h5 className="white-text">{props.footerContent.socialMediaText}</h5>
            <ul>
              <li><a className="white-text" href="#!">Facebook</a></li>
              <li><a className="white-text" href="#!">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">{copyrightText}</div>
      </div>
    </footer>
  );
};

export default Footer;
