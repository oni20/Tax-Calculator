import { Container, Row, Col, Image } from 'react-bootstrap';
import React from 'react';
import HeroStyle from './hero.module.scss';
import LottiePlayer from './LottiePlayer';

const Hero = props => {
    return (
        <Container className="mt-5" id="maincontent">
            <Row>
                <Col xs={6} md={5} className="d-flex flex-column justify-content-center">
                    <h1 className={`${HeroStyle.text__small} ${HeroStyle.text__white}`}>{props.introTitle}</h1>
                    <p className="text-white d-none d-md-block">{props.introDesc.replace('$currYear$', new Date().getFullYear())}</p>
                </Col>

                <Col xs={{ span: 5, offset: 2 }} className="d-none d-sm-flex flex-row justify-content-end">
                    <LottiePlayer
                        imageSource="https://assets9.lottiefiles.com/packages/lf20_hmpqgxid.json"
                        imageStyle={{ height: '350px', width: '350px' }}
                        isKeepLastFrame={true}
                        isLoop={false}
                    />
                </Col>
                <Col xs={{ span: 12, offset: 0 }} md={{ span: 5, offset: 2 }} className="d-flex d-sm-none flex-row justify-content-end">
                    <Image src="hero-illustration.svg" alt="" className={`${HeroStyle.hero_illustration__position}`} width="100%" fluid />
                </Col>
            </Row>
            <div className={HeroStyle.curve__container}>
                <Image src="curve-background.svg" alt="" className={HeroStyle.curve__image} />
            </div>
        </Container>
    );
};

export default Hero;