import React, { Component } from 'react';
import { CardBody, Label, Row, Col } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { DataCry } from '../data/DataCry';
import Axios from 'axios';
import styles from '../styles/Chart.module.css';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { data1, data2, data3, data4, options, tempoptions, humoptions, co2options } from '../data/ChartData';

class Chart extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){
    super(props)
    const { cookies } = this.props
    this.title = this.props.title;
    this.farmkey = this.props.farmkey;
    this.delay = 1000 * 60 * 5
    this.state = {
      data1: data1,
      data2: data2,
      data3: data3,
      data4: data4,
      temp: cookies.get('temp') || [],
      hum: cookies.get('hum') || [],
      co2: cookies.get('co2') || [],
    }
  }
  componentDidMount = () => {
    this.postData();
    this.interval = setInterval(this.postData, this.delay)
  }

  componentWillUnmount = () => {
    clearInterval(this.interval)
  }

  postData = async() => {
    const { cookies } = this.props;
    const days = Date.now().toString();
    const url = "http://192.168.0.1/api/env";
    await Axios.post(url,
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
        const { cookies } = this.props;
        if(this.state.temp.length < 13) {
          this.setState(({temp, hum, co2})=>({
            temp: temp.concat(res.data.payload[0].TEMP),
            hum: hum.concat(res.data.payload[0].HUMID),
            co2: co2.concat(res.data.payload[0].CO2),
          }),()=>{
            cookies.set('temp', this.state.temp, { path: '/' })
            cookies.set('hum', this.state.hum, { path: '/' })
            cookies.set('co2', this.state.co2, { path: '/' })
          })
        } else if (this.state.temp.length === 13) {
          this.setState(({temp, hum, co2})=>({
            temp: temp.slice(1, 13).concat(res.data.payload[0].TEMP),
            hum: hum.slice(1, 13).concat(res.data.payload[0].HUMID),
            co2: co2.slice(1, 13).concat(res.data.payload[0].CO2),
          }),()=>{
            cookies.set('temp', this.state.temp, { path: '/' })
            cookies.set('hum', this.state.hum, { path: '/' })
            cookies.set('co2', this.state.co2, { path: '/' })
          })
      }
        this.setState((prev)=>{
          let data1 = Object.assign({}, prev.data1)
          data1.datasets[0].data = this.state.temp
          let data2 = Object.assign({}, prev.data2)
          data2.datasets[0].data = this.state.hum
          let data3 = Object.assign({}, prev.data3)
          data3.datasets[0].data = this.state.co2
          return { data1, data2, data3 }
        })
      })
      .catch((err) => {
        alert(err)
      })
  } 
  
  render() {
    console.log('Chart')
    return (
      <CardBody className={styles.container}>
        <Label className={styles.label}>{this.title}</Label>
        <Row className={styles.row}>
        <Col md={6}>
        <Line data={this.state.data1} options={tempoptions}/>
        </Col>
        <Col md={6}>
        <Line data={this.state.data2} options={humoptions}/>
        </Col>
        </Row>

        <Row className={styles.row}>
        <Col md={6}>
        <Line data={this.state.data3} options={co2options}/>
        </Col>
        <Col md={6}>
        <Line data={this.state.data4} options={options}/>
        </Col>
        </Row>
      </CardBody>
    );
  }
}

export default withCookies(Chart);