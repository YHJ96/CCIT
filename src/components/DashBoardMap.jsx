import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import KaKaoMap from './KaKaoMap';
import Log from './Log';
import Weather from './Weather';

class DashBoardMap extends Component {
    render() {
        console.log('DashBoardMap')
        return (
            <Container fluid>
                <Row>
                    <Col md style={{ height: '100vh', }}>
                        <Card style={{backgroundColor: '#2f3237', height: '98%', marginTop: '1%', marginBottom: '1%'}}>
                        <KaKaoMap/>
                        </Card>
                    </Col>
                    <Col style={{ height: '100vh'}}>
                        <Card style={{backgroundColor: '#2f3237', height: '48%', marginTop: '1%', marginBottom: '1%'}}>
                            <Weather/>
                        </Card>
                        <Card style={{backgroundColor: '#2f3237', height: '48%', marginTop: '2%'}}>
                            <Log/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DashBoardMap;