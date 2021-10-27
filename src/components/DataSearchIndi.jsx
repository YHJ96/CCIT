import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, Form } from 'reactstrap';
import styles from '../styles/DataSearchIndi.module.css';
import { Line } from 'react-chartjs-2';
import DataSearchIndiNav from './DataSearchIndiNav';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { DataCry } from '../data/DataCry';
import Axios from 'axios';

class DataSearchIndi extends PureComponent {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props)
    this.state = {
      farmData: [],
      farmValue: [],
      farmlabel: '',
      farmtype: '',
    }
  }

  farmTextType = (label, type) => {
    this.setState({
      farmlabel: label,
      farmtype: type,
    })
  }

  chartData = () => {
    const data = {
      datasets: [
        {
          label: this.state.farmlabel,
          data: this.state.farmValue,
          parsing: {
            xAxisKey: 'DATE',
            yAxisKey: this.state.farmtype,
          },
          fill: false,
          backgroundColor: 'rgb(86, 204, 242)',
          borderColor: 'rgba(86, 204, 242, 0.2)',
        },
      ],
    };
    return data;
  }

  chartOptions = () => {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
      },
    };
    return options
  }

  postData = (farm, start, end, sensor, type) => {
    const { cookies } = this.props;
    const days = Date.now().toString();
    const url = `http://192.168.0.1/api/env/avg-${type}`;
    Axios.post(url,
      {
        user_id: `${cookies.get('id')}`,
        farm_id: farm,
        start_date: start,
        end_date: end,
        sensor_type: sensor,
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
        if (type === 'hour') {
          this.setState({farmData: [], farmValue: [],})
          return this.setState({
            farmData: res.data.payload
          },

          ()=>{
            this.state.farmData.map((item)=>{
              return this.setState(({farmValue})=>({
                farmValue: farmValue.concat({ 
                  DATE: `${item.DATE}${item.TIME}`, 
                  TEMP: `${item.TEMP}`, 
                  HUMID: `${item.HUMID}`, 
                  CO2: `${item.CO2}` 
                })
              }))
            })
          })
        } else if (type === 'day') {
          this.setState({
            farmValue: res.data.payload
          })
        }

      })

      .catch((err) => {
        alert(err)
      })
  }
  render() {
    console.log(this.state.farmValue)
    return (
      <Container fluid>
        <Form className={styles.form}>
          <DataSearchIndiNav Post={this.postData} FarmTextType={this.farmTextType} />
        </Form>
        <Row>
          <Col className={styles.col}>
            <Card className={styles.card}>
              <Line key={Math.random()} data={this.chartData()} options={this.chartOptions()}/>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withCookies(DataSearchIndi);