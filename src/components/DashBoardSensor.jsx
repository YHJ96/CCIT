import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { API_FARM1, API_FARM2 } from '../data/SensorData';
import styles from '../styles/DashBoardSensor.module.css';
import Sensor from './Sensor';

class DashBoardSensor extends Component {
    
    sensorCreate1 = () => {
        return API_FARM1.map((item)=>{
            return <Col md className={styles.col} key={item.key}>
            <Sensor title={item.title} farmkey={item.farmkey} color={item.color}/>
            </Col>
        })
    }

    sensorCreate2 = () => {
        return API_FARM2.map((item)=>{
            return <Col md className={styles.col} key={item.key}>
            <Sensor title={item.title} farmkey={item.farmkey} color={item.color}/>
            </Col>
        })
    }
    render() {
        console.log('DashBoardSensor')
        return (
            <Container fluid>
                <Row>
                    {this.sensorCreate1()}
                </Row>
                <Row>
                    {this.sensorCreate2()}
                </Row>
            </Container>
        );
    }
}

export default DashBoardSensor;