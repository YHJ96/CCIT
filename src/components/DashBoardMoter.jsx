import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Moter from './Moter';
class DashBoardMoter extends Component {
    render() {
        console.log('DashBoardMoter')
        return (
            <Container fluid>
                <Row>
                    <Col md style={{ height: '50vh' }}>
                        <Moter text={1}/>
                    </Col>
                    <Col style={{ height: '50vh' }}>
                        <Moter text={2}/>
                    </Col>
                </Row>
                <Row>
                    <Col md style={{ height: '50vh' }}>
                        <Moter text={3}/>
                    </Col>
                    <Col style={{ height: '50vh' }}>
                        <Moter text={4}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DashBoardMoter;