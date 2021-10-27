import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, Form } from 'reactstrap';
import styles from '../styles/DataSearchMulti.module.css';
import { Line } from 'react-chartjs-2';
import DataSearchMultiNav from './DataSearchMultiNav';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { DataCry } from '../data/DataCry';
import Axios from 'axios';

class DataSearchMulti extends PureComponent {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props)
    this.state = {
      farmData1: [],
      farmData2: [],
      farmValue1: [],
      farmValue2: [],
      farmlabel1: '',
      farmlabel2: '',
      farmtypelabel: '',
      type: '',
    }
  }

  chartData = () => {
    const data = {
      datasets: [
        {
          label: `${this.state.farmlabel1} ${this.state.farmtypelabel}`,
          data: this.state.farmData1,
          parsing: {
            xAxisKey: 'DATE',
            yAxisKey: this.state.type,
          },
          fill: false,
          backgroundColor: 'rgb(86, 204, 242)',
          borderColor: 'rgba(86, 204, 242, 0.2)',
        },
        {
          label: `${this.state.farmlabel2} ${this.state.farmtypelabel}`,
          data: this.state.farmData2,
          parsing: {
            xAxisKey: 'DATE',
            yAxisKey: this.state.type
          },
          fill: false,
          backgroundColor: 'rgb(94, 91, 230)',
          borderColor: 'rgba(94, 91, 230, 0.2)',
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
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    return options
  }

  farmTextType = (label1, label2, typelabel, type) => {
    this.setState({
      farmlabel1: label1,
      farmlabel2: label2,
      farmtypelabel: typelabel,
      type: type,
    })
  }

  postData = (farm1, farm2, start, end, sensor, type) => {
    const { cookies } = this.props;
    const days = Date.now().toString();
    const url = `http://192.168.0.1/api/env/compare-${type}`;
    console.log(farm1, farm2, start, end, sensor, type, cookies.get('id'))
    Axios.post(url,
      {
        user_id: `${cookies.get('id')}`,
        farm_id_1: `${farm1}`,
        farm_id_2: `${farm2}`,
        start_date: start,
        end_date: end,
        sensor_type: sensor,
      },
      {
        headers: {
          'x-date': days,
          'x-accesskey': 'GSSIOT',
          'x-signature': DataCry(url, days),
          'jwt': `${cookies.get('jwt')}`
        }
      }
    )
      .then((res) => {
        console.log(res.data)
        const data1 = res.data.payload.filter((item)=>{
          return item.FARM_ID === `${farm1}`
        })
        const data2 = res.data.payload.filter((item)=>{
          return item.FARM_ID === `${farm2}`
        })
        if (type === 'hour') {
          const data1 = res.data.payload.filter((item)=>{
            return item.FARM_ID === `${farm1}`
          })
          const data2 = res.data.payload.filter((item)=>{
            return item.FARM_ID === `${farm2}`
          })
          const map1 = data1.map((item=>{
            return ({ DATE: `${item.DATE}${item.TIME}`, TEMP: `${item.TEMP}`, HUMID: `${item.HUMID}`, CO2: `${item.CO2}` })
          }))
          const map2 = data2.map((item=>{
            return ({ DATE: `${item.DATE}${item.TIME}`, TEMP: `${item.TEMP}`, HUMID: `${item.HUMID}`, CO2: `${item.CO2}` })
          }))
          this.setState({
            farmData1: map1,
            farmData2: map2,
          })
        } else if(type === 'day') {
          this.setState({
            farmData1: data1,
            farmData2: data2,
          })
        }
      })
      .catch((err) => {
        alert(err)
      })
  }

  render() {
    return (
      <Container fluid>
        <Form className={styles.form}>
          <DataSearchMultiNav Post={this.postData} FarmTextType={this.farmTextType} />
        </Form>
        <Row>
          <Col className={styles.col}>
            <Card className={styles.card}>
              <Line key={Math.random()} data={this.chartData()} options={this.chartOptions()} />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withCookies(DataSearchMulti);