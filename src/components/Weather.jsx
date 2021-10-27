import React, { Component } from 'react';
import { CardBody, Label, CardText, Row, Col, CardImg } from 'reactstrap';
import * as Icon from 'react-bootstrap-icons';
import styles from '../styles/Weather.module.css';
import { WeatherImg, WeatherIcon, WeatherText } from '../data/WeatherImage';
import moment from 'moment';
import Axios from 'axios';
import { DataCry } from '../data/DataCry';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Weather extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props)
        this.delay = 1000 * 60 * 60
        this.state = {
            temp: '',
            wind: '',
            hum: '',
            wh: '',
            weekwh: [],
        }
    }
    componentDidMount () {
        this.postData();
        this.postWeekdata();
        this.interval1 = setInterval(this.postData, this.delay)
        this.interval2 = setInterval(this.postWeekdata, this.delay)
    }

    componentWillUnmount = () => {
        clearInterval(this.interval1)
        clearInterval(this.interval2)
      }

    postData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/weather/day";
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
                    temp: res.data.payload.main.temp,
                    hum: res.data.payload.main.humidity,
                    wind: res.data.payload.wind.speed,
                    wh: res.data.payload.weather[0].main,
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    postWeekdata = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/weather/week";
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
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                this.setState({
                    weekwh: [],
                })
                return this.setState(({weekwh})=>({
                    weekwh: weekwh.concat(res.data.payload.daily[1], res.data.payload.daily[2], res.data.payload.daily[3], res.data.payload.daily[4], res.data.payload.daily[5])
                }))
            })
            .catch((err) => {
                alert(err)
            })
    }

    /* postWeekdata = async() => {
        await Axios.get(URL)
        .then((res)=>{
            console.log(res.data)
            this.setState(({weekwh})=>({
                weekwh: weekwh.concat(res.data.daily[1], res.data.daily[2], res.data.daily[3], res.data.daily[4], res.data.daily[5])
            }))
        })
        .catch((err)=>{
            alert(err)
        })
    } */

    render() {
        console.log('Weather')
        return (
            <CardBody className={styles.container}>
                
                <Row className={styles.labelcontainer}>
                <Label tag={'h4'} className={styles.label}>
                    실시간 날씨 상황
                </Label>
                <Icon.GeoAlt className={styles.icon}/>
                <CardText className={styles.labeltext}>GoYang-Si</CardText>
                <CardText className={styles.labeltext}>{`Today, ${moment().format('MMMM Do')}`}</CardText>
                </Row>
                
                <Row className={styles.dailycontainer}>
                    <Col md={{size: 2}}>
                    <CardText className={styles.dailylabel}>
                    <CardImg className={styles.dailyicon} src={WeatherImg(this.state.wh)}/>
                    </CardText>
                    </Col>

                    <Col md={{size: 3}}>
                    <CardText tag={'h2'} className={styles.dailytext}>{`${parseInt(this.state.temp - 273)} ℃`}</CardText>
                    <CardText className={styles.dailytext} >{WeatherText(this.state.wh)}</CardText>
                    </Col>

                    <Col md={{size: 3}}>
                    <CardText className={styles.dailyvalue} >
                        <CardImg className={styles.dailyimg} src={WeatherIcon[0].Wind}/>{`Wind : ${((this.state.wind) / 1).toFixed(1)} m/s`}</CardText>
                    <CardText className={styles.dailyvalue} >
                        <CardImg className={styles.dailyimg} src={WeatherIcon[0].Hum}/>{`Hum : ${this.state.hum} %`}</CardText>
                    </Col>
                </Row>

                <Label className={styles.soild}>
                <CardText className={styles.soilditem}>{''}</CardText>
                </Label>

                <Row className={styles.weekcontainer}>
                    {this.state.weekwh.map((item, index)=>{
                        return <Col xs={2} md={2} key={index}>
                        <CardText className={styles.weeklabel}>{`${moment().add(`${index + 1}`, 'days').format('MMMM.D')}`}</CardText>
                        <CardText className={styles.weekitem}>
                        <CardImg className={styles.weekimg} src={WeatherImg(`${item.weather[0].main}`)}/>
                        </CardText>
                        <CardText className={styles.weektext}>{`${parseInt(item.temp.day)} ℃`}</CardText>
                        </Col>
                    })}
                </Row>
            </CardBody>
        );
    }
}

export default withCookies(Weather);