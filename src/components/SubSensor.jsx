import React, { Component } from 'react';
import { CardBody, Row, Col, CardText, Label, Progress, CardTitle, Card } from 'reactstrap';
import styles from '../styles/SubSensor.module.css';
import Axios from 'axios';
import { DataCry } from '../data/DataCry';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class SubSensor extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props)
        this.farmkey = this.props.farmkey
        this.state = {
            farmValue: []
        }
    }

    componentDidMount () {
        this.postData()
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

    render() {
        const { farmValue } = this.state;
        return (
            <CardBody className={styles.container}>
            <Row>
                <Label className={styles.label} tag={'h4'}>최근 차트값</Label>
            </Row>
            <Row className={styles.row}>
                <Col>
                <Card className={styles.card}>
                    <CardBody>
                        <CardTitle className={styles.title}>온도센서</CardTitle>
                            <CardText className={styles.textcontainer} tag={'div'}>
                                <CardText className={styles.text} tag={"div"} >실시간센서값</CardText>
                                <CardText id={styles.textvalue} className={styles.text} tag={"div"} >{`${farmValue.TEMP}℃`}</CardText>
                            </CardText>

                        <Progress className={styles.progress} value={'80'}/>
                                <CardText className={styles.textcontainer} tag={'div'}>
                                <CardText className={styles.text} tag={"div"}>가동률</CardText>
                                <CardText className={styles.text}>100%</CardText>
                        </CardText>
                        </CardBody>
                        <CardBody>
                        <CardTitle className={styles.title}>습도센서</CardTitle>
                            <CardText className={styles.textcontainer} tag={'div'}>
                                <CardText className={styles.text} tag={"div"} >실시간센서값</CardText>
                                <CardText id={styles.textvalue} className={styles.text} tag={"div"} >{`${farmValue.HUMID}%`}</CardText>
                            </CardText>

                        <Progress className={styles.progress} value={'80'}/>
                                <CardText className={styles.textcontainer} tag={'div'}>
                                <CardText className={styles.text} tag={"div"}>가동률</CardText>
                                <CardText className={styles.text}>100%</CardText>
                        </CardText>
                        </CardBody>
                        <CardBody>
                        <CardTitle className={styles.title}>CO2센서</CardTitle>
                            <CardText className={styles.textcontainer} tag={'div'}>
                                <CardText className={styles.text} tag={"div"} >실시간센서값</CardText>
                                <CardText id={styles.textvalue} className={styles.text} tag={"div"} >{`${farmValue.CO2} PPM`}</CardText>
                            </CardText>

                        <Progress className={styles.progress} value={'80'}/>
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

export default withCookies(SubSensor);