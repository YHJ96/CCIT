import React, { PureComponent } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Stock from './stock/Stock';
import CardSystem from './system/CardSystem';
import Financial from './financial/Financial';
import Clock from './clock/Clock';
import Map from './map/Map';
import TimeLine from './projects/TimeLine';
import TrTable from './system/TrTable';
import DailyChart from './daily/DailyChart';
import DailyWeather from './weather/DailyWeather';
import { farmdata } from '../data/FarmData';
import styles from './Update.module.css';

class Update extends PureComponent {

    componentDidMount () {
        document.addEventListener("keydown", this.escEvent, false);
    }

    componentWillUnmount () {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escEvent = (event) => {
        const { history } = this.props;
        if(event.keyCode === 27) {
            history.push('/main');
        }
    }

    createCardSystem1 = () => {
        return farmdata.map((item,index) => {
            return <Col key={index} lg={3} style={{ height: '100%', padding: 0 }} >
            <Form style={{ height: '92%', margin: '2%', borderRadius: 10}}>
                <CardSystem 
                title={item.title}
                badgeColor={item.color}
                pieColor={item.color}
                farmkey={item.farmkey}
                barStrokeColor={item.color}
                barColors={item.color}
                ifid1={item.ifid1}
                />
            </Form>
            </Col>
        })
    }

    createCardSystem2 = () => {
        return farmdata.map((item,index) => {
            return <Col key={index} lg={3} style={{ height: '100%', padding: 0 }} >
            <Form style={{ height: '92%', margin: '2%', borderRadius: 10}}>
                <CardSystem 
                title={item.title}
                badgeColor={item.color}
                pieColor={item.color}
                farmkey={item.farmkey}
                barStrokeColor={item.color}
                barColors={item.color}
                ifid2={item.ifid2}
                />
            </Form>
            </Col>
        })
    }

    render() {
        return (
            <Container fluid className={styles.container} style={{ backgroundColor: '#212528' }}>
                <Row>
                    <Col lg={8} style={{ height: '80vh' }}>
                        <Row style={{ height: '20%' }}>
                            {this.createCardSystem1()}
                        </Row>

                        <Row style={{ height: '20%' }}>
                            {this.createCardSystem2()}
                        </Row>

                        <Row style={{ height: '60%' }}>
                            <Col lg={12} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <FormGroup style={{ height: '100%', width: '100%', marginTop: '1%', backgroundColor: '#2f3237' }}>
                                    <span style={{ color: '#fdfdfd', fontSize: 25, fontWeight: 'bold', marginLeft : 5, height: '10%' }}>누적 센서값 (일간)</span>
                                    <Form style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                    <TrTable/>
                                    </Form>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>

                    <Col lg={4} style={{ height: '80vh' }}>
                        <Row style={{ height: '25%' }}>
                            <Col lg={6} style={{ height: '100%' }}>
                                <Clock/>
                            </Col>
                            <Col lg={6} style={{ height: '100%' }}>
                                {<DailyWeather/>}
                            </Col>
                        </Row>
                        <Row style={{ height: '25%', display: 'flex' }}>
                            <Col lg={6} style={{ height: '100%' }}>
                                {<Financial/>}
                            </Col>
                            <Col lg={6} style={{ height: '100%' }}>
                                <TimeLine/>
                            </Col>
                        </Row>
                        <Row style={{ height: '50%' }}>
                            <Col lg={12} style={{ height: '100%' }}>
                                <DailyChart/>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    <Col style={{ height: '20vh'}}>
                        <Row style={{ height: '100%' }}>
                        <Col lg={4} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Stock/>
                        </Col>
                        <Col lg={2} style={{ height: '100%' }}>
                            <Map/>
                        </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default Update;