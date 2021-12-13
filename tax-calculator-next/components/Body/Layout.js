import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GlobalContext } from '../Context/GlobalContext';
import Hero from '../common/Hero';

const Layout = ({
    children,
    leftOrientation,
    rightOrientation
}) => {
    const { content } = useContext(GlobalContext);
    const [LeftComponent, RightComponent] = children;
    
    return (
        <>
            <Hero
                introTitle={content.body.introTitle}
                introDesc={content.body.introDesc.replace('$currYear$', new Date().getFullYear())}
            />

            <Container className='mt-5'>
                <Row>
                    <Col lg={leftOrientation.desktopScreen} xs={leftOrientation.mobileScreen}>
                        {LeftComponent}
                    </Col>

                    <Col lg={rightOrientation.desktopScreen} xs={rightOrientation.mobileScreen}>
                        {RightComponent}
                    </Col>
                </Row>
            </Container>
        </>

    )
};

export default Layout;
