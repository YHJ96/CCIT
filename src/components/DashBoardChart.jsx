import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Chart from './Chart';
import { API_FARM1, API_FARM2 } from '../data/ChartData';
import styles from '../styles/DashBoardChart.module.css';

class DashBoardChart extends PureComponent {
    createChart1 = () => {
        return API_FARM1.map((item)=>{
            return <Col md className={styles.col} key={item.key}>
                <Chart title={item.title} farmkey={item.farmkey}/>
                </Col>
        })
    }
    createChart2 = () => {
        return API_FARM2.map((item)=>{
            return <Col md className={styles.col} key={item.key}>
                <Chart title={item.title} farmkey={item.farmkey}/>
                </Col>
        })
    }
    render() {
        console.log('DashBoardChart')
        return (
            <Container fluid>
                <Row>
                    {this.createChart1()}
                </Row>
                <Row>
                    {this.createChart2()}
                </Row>
            </Container>
        );
    }
}

export default DashBoardChart;