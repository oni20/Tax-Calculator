import { Container, Row, Col, Image } from 'react-bootstrap';
import React from 'react';
import './Hero.scss';

const Hero = props => {
    return (
        <Container className="mt-5">
            <Row>
                <Col xs={5} className="d-flex flex-column justify-content-center">
                <h1 className="text-white">{props.introTitle}</h1>
                <p className="text-white">{props.introDesc.replace("$currYear$", new Date().getFullYear())}</p>
                </Col>  
                
                <Col xs={{ span: 5, offset: 2 }} className="d-flex flex-row justify-content-end">
                    <Image src="hero-illustration.svg" width="100%" fluid/>
                </Col>
            </Row>
            <div className="curve__container">
                <Image src="curve-background.svg" className="curve__image" />
            </div>
        </Container>
    )

}

export default Hero;