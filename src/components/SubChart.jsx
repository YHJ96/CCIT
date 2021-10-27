import React, { Component } from 'react';
import { CardBody, Row, Col, CardText, Label } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Axios from 'axios';
import { DataCry } from '../data/DataCry';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class SubChart extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props)
    const { farmkey } = this.props;
    this.farmkey = farmkey
    this.state = {
      temp: [],
      humi: [],
      CO2: [],
    }
  }
  componentDidMount () {
    this.postData();
  }
  postData = () => {
    const { cookies } = this.props;
    const days = Date.now().toString();
    const url = `http://192.168.0.1/api/env/avg-day`;
    Axios.post(url,
      {
        user_id: `${cookies.get('id')}`,
        farm_id: this.farmkey,
        start_date: moment().subtract(5, 'days').format('YYYYMMDD'),
        end_date: moment().subtract(1, 'days').format('YYYYMMDD'),
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
        res.data.payload.map((item)=>{
          return this.setState(({temp, humi, CO2})=>({
            temp: temp.concat(item.TEMP),
            humi: humi.concat(item.HUMID),
            CO2: CO2.concat(item.CO2)
          }))
        })
      })
      .catch((err) => {
        alert(err)
      })
  }
  createChart = () => {
    const data = {
      labels: [
        `${moment().subtract(5, 'days').format('MMMM Do')}`,
        `${moment().subtract(4, 'days').format('MMMM Do')}`,
        `${moment().subtract(3, 'days').format('MMMM Do')}`,
        `${moment().subtract(2, 'days').format('MMMM Do')}`,
        `${moment().subtract(1, 'days').format('MMMM Do')}`
      ],
      datasets: [
        {
          label: '온도',
          data: this.state.temp,
          fill: false,
          backgroundColor: 'rgb(86, 204, 242)',
          borderColor: 'rgba(86, 204, 242, 0.2)',
        },
        {
          label: '습도',
          data: this.state.humi,
          fill: false,
          backgroundColor: 'rgb(94, 91, 230)',
          borderColor: 'rgba(94, 91, 230, 0.2)',
        },
        {
          label: 'CO2',
          data: this.state.CO2,
          fill: false,
          backgroundColor: 'rgb(204, 204, 205)',
          borderColor: 'rgba(204, 204, 205, 0.2)',
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return <Line data={data} options={options} />
  }
  render() {
    return (
      <CardBody style={{ width: '100%', height: '100%' }}>
        <Row>
          <Label tag={'h4'} style={{ margin: 0, padding: 0, fontWeight: 'bold', color: '#fdfdfd', marginLeft: '1%' }} >누적 센서값</Label>
        </Row>
        <Row style={{ height: '90%', marginTop: '1%' }}>
          <Col>
            <CardText style={{ width: '100%', height: '100%' }}>
              {this.createChart()}
            </CardText>
          </Col>
        </Row>
      </CardBody>
    );
  }
}

export default withCookies(SubChart);