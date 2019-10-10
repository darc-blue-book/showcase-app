import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>   <a href="#">Imprint</a> | <a href="#">Data Protection</a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sponsored by Deutsche Bank.</p>
      </Col>
    </Row>
  </div>
);

export default Footer;
