import React, { Component } from 'react';
import { Container, Row, Col, Card, FormText} from 'reactstrap';
import styles from '../styles/DetailSearchValue.module.css';
import SubChart from './SubChart';
import SubKaKaoMap from './SubKaKaoMap';
import SubSensor from './SubSensor';
import Weather from './Weather';

class DetailSearchValue extends Component {
    constructor(props){
        super(props)
        this.lat = this.props.lat;
        this.lng = this.props.lng;
        this.title = this.props.title;
        this.farmkey = this.props.farmkey;
    }
    render() {
        return (
            <Container fluid>
                <FormText style={{ fontWeight: 'bold' }} className={styles.farmtitle} color={""}>{`${this.props.title}`}</FormText>
                <Row>
                    <Col md={6} style={{ height: '50vh' }}>
                        <Card style={{ backgroundColor: '#2f3237', height: '96%', marginTop: '1%', marginBottom: '1%' }} >
                            <SubKaKaoMap lat={this.lat} lng={this.lng} title={this.title}/>
                        </Card>
                    </Col>
                    <Col md={6} style={{ height: '50vh' }}>
                        <Card style={{ backgroundColor: '#2f3237', height: '96%', marginTop: '1%', marginBottom: '1%' }}>
                            <Weather/>  
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} style={{ height: '50vh' }}>
                        <Card style={{ backgroundColor: '#2f3237', height: '96%', marginTop: '1%', marginBottom: '1%' }} >
                            <SubSensor farmkey={this.farmkey}/>
                        </Card>
                    </Col>
                    <Col md={6} style={{ height: '50vh' }}>
                        <Card style={{ backgroundColor: '#2f3237', height: '96%', marginTop: '1%', marginBottom: '1%' }} >
                            <SubChart farmkey={this.farmkey}/>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DetailSearchValue;