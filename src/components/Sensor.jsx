import React, { Component } from 'react';
import { CardBody, CardText, CardTitle, Progress, Label, Card, Row, Col } from 'reactstrap';
import Axios from 'axios';
import { DataCry } from '../data/DataCry'
import styles from '../styles/Sensor.module.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Sensor extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.title = this.props.title
        this.farmkey = this.props.farmkey
        this.delay = 1000 * 60 * 3
        this.state = {
            farmValue: [],
        }
    }

    componentDidMount = () => {
        this.postData();
        this.interval = setInterval(this.postData, this.delay)
    }

    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    postData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/env";
        Axios.post(url,
            {
                user_id: `${cookies.get('id')}`,
                farm_id: `${this.farmkey}`,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt': cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                this.setState({
                    farmValue: res.data.payload[0],
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    color = () => {
        const { color } = this.props
        if (color === 'info') {
            return 'info';
        } else if (color === 'primary') {
            return '';
        }
    }

    render() {
        const { farmValue } = this.state
        console.log('Sensor')
        return (
            <CardBody className={styles.container}>
                <Label className={styles.label} onClick={() => clearInterval(this.test)}>{this.title}</Label>

                <Row>
                    <Col md={6} className={styles.col}>
                        <Card id={styles.card1} className={styles.card}>
                            <CardBody>
                                <CardTitle className={styles.title}>온도센서</CardTitle>

                                <CardText className={styles.textcontainer} tag={'div'}>
                                    <CardText className={styles.text} tag={"div"} >실시간센서값</CardText>
                                    <CardText id={styles.textvalue} className={styles.text} tag={"div"} >{`${farmValue.TEMP}℃`}</CardText>
                                </CardText>

                                <Progress className={styles.progress} value={'80'} color={this.color()} />
                                <CardText className={styles.textcontainer} tag={'div'}>
                                    <CardText className={styles.text} tag={"div"}>가동률</CardText>
                                    <CardText className={styles.text}>100%</CardText>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} className={styles.col}>
                        <Card id={styles.card2} className={styles.card}>
                            <CardBody>
                                <CardTitle className={styles.title}>습도센서</CardTitle>

                                <CardText className={styles.textcontainer} tag={'div'}>
                                    <CardText className={styles.text} tag={"div"} >실시간센서값</CardText>
                                    <CardText id={styles.textvalue} className={styles.text} tag={"div"} >{`${farmValue.HUMID}%`}</CardText>
                                </CardText>

                                <Progress className={styles.progress} value={'80'} color={this.color()} />
                                <CardText className={styles.textcontainer} tag={'div'}>
                                    <CardText className={styles.text} tag={"div"}>가동률</CardText>
                                    <CardText className={styles.text}>100%</CardText>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className={styles.col}>
                        <Card id={styles.card3} className={styles.card}>
                            <CardBody>
                                <CardTitle className={styles.title}>CO2센서</CardTitle>

                                <CardText className={styles.textcontainer} tag={'div'}>
                                    <CardText className={styles.text} tag={"div"} >실시간센서값</CardText>
                                    <CardText id={styles.textvalue} className={styles.text} tag={"div"} >{`${farmValue.CO2} PPM`}</CardText>
                                </CardText>

                                <Progress className={styles.progress} value={'80'} color={this.color()} />
                                <CardText className={styles.textcontainer} tag={'div'}>
                                    <CardText className={styles.text} tag={"div"}>가동률</CardText>
                                    <CardText className={styles.text}>100%</CardText>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6} className={styles.col}>
                        <Card id={styles.card4} className={styles.card}>
                            <CardBody>
                                <CardTitle className={styles.title}>센서</CardTitle>

                                <CardText className={styles.textcontainer} tag={'div'}>
                                    <CardText className={styles.text} tag={"div"} >실시간센서값</CardText>
                                    <CardText id={styles.textvalue} className={styles.text} tag={"div"} >0</CardText>
                                </CardText>

                                <Progress className={styles.progress} value={'80'} color={this.color()} />
                                <CardText className={styles.textcontainer} tag={'div'}>
                                    <CardText className={styles.text} tag={"div"}>가동률</CardText>
                                    <CardText className={styles.text}>100%</CardText>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        );
    }
}

export default withCookies(Sensor);