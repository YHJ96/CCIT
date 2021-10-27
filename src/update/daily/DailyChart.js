import React, { PureComponent } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { instanceOf } from 'prop-types';
import { DataCry } from '../../data/DataCry'
import { Cookies, withCookies } from 'react-cookie';
import Axios from 'axios';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import ChartModal from './ChartModal';

class DailyChart extends PureComponent {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props)
    this.props = props;
    this.state = {
      farmValue1 : [],
      farmValue2 : [],
      farmValue3 : [],
      farmValue4 : [],
      isOpen : false,
      startDate: moment().subtract('5', 'days').format('YYYYMMDD'),
      endDate: moment().format('YYYYMMDD'),
      type: 'TEMP',
    }
  }

  toggle = () => {
    this.setState(({isOpen})=>({
      isOpen: !isOpen
    }))
  }

  farmType = (type) => {
    this.setState({
      type: type,
    })
  }

  postData1 = (st, ed, ty) => {
    const { cookies } = this.props;
    const days = Date.now().toString();
    const url = `http://192.168.0.1/api/env/compare-day`;
    Axios.post(url,
      {
        farm_id_1: 1,
        farm_id_2: 2,
        start_date: st || this.state.startDate,
        end_date: ed || this.state.endDate,
        sensor_type: ty || this.state.type,
      },
      {
        headers: {
          'x-date': days,
          'x-accesskey': 'GSSIOT',
          'x-signature': DataCry(url, days),
          'jwt': `${cookies.get('jwt')}`
        }
      }
    ).then((res)=>{
      if(res.data.statusCode === 305) { return alert('권한없음') }
      console.log(res.data)
      let farm1 = res.data.payload.filter((item) => item.FARM_ID === 1)
      let farm2 = res.data.payload.filter((item) => item.FARM_ID === 2)
      this.setState({
        farmValue1: farm1,
        farmValue2: farm2
      })
    })
  }

  postData2 = (st, ed, ty) => {
    const { cookies } = this.props;
    const days = Date.now().toString();
    const url = `http://192.168.0.1/api/env/compare-day`;
    Axios.post(url,
      {
        farm_id_1: 3,
        farm_id_2: 4,
        start_date: st || this.state.startDate,
        end_date: ed || this.state.endDate,
        sensor_type: ty || this.state.type,
      },
      {
        headers: {
          'x-date': days,
          'x-accesskey': 'GSSIOT',
          'x-signature': DataCry(url, days),
          'jwt': `${cookies.get('jwt')}`
        }
      }
    ).then((res)=>{
      if(res.data.statusCode === 305) { return alert('권한없음') }
      console.log(res.data)
      let farm3 = res.data.payload.filter((item) => item.FARM_ID === 3)
      let farm4 = res.data.payload.filter((item) => item.FARM_ID === 4)
      this.setState({
        farmValue3: farm3,
        farmValue4: farm4,
      })
    })
  }

  chartData = () => {
    const data = {
      datasets: [
        {
          label: '수직형',
          data: this.state.farmValue1,
          parsing: {
            xAxisKey: 'DATE',
            yAxisKey: this.state.type,
          },
          fill: false,
          backgroundColor: '#F27212',
          borderColor: 'rgba(242, 114, 18, 0.2)',
        },
        {
          label: '생력형A',
          data: this.state.farmValue2,
          parsing: {
            xAxisKey: 'DATE',
            yAxisKey: this.state.type,
          },
          fill: false,
          backgroundColor: '#F7BF47',
          borderColor: 'rgba(247, 191, 71, 0.2)',
        },
        {
          label: '생력형B',
          data: this.state.farmValue3,
          parsing: {
            xAxisKey: 'DATE',
            yAxisKey: this.state.type,
          },
          fill: false,
          backgroundColor: '#33AE9A',
          borderColor: 'rgba(51, 174, 154, 0.2)',
        },
        {
          label: '전통형',
          data: this.state.farmValue4,
          parsing: {
            xAxisKey: 'DATE',
            yAxisKey: this.state.type,
          },
          fill: false,
          backgroundColor: '#1EB7FF',
          borderColor: 'rgba(30, 183, 255, 0.2)',
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

  render() {
    return (
      <Card style={{ height: '100%', width: '100%', background: '#2f3237', color: '#fdfdfd' }}>
        <CardText style={{ margin: 0, padding: 0, fontSize: '20px' }} onClick={this.toggle}>농장별 비교 센서값</CardText>
        <ChartModal isOpen={this.state.isOpen} toggle={this.toggle} farmType={this.farmType} postData1={this.postData1} postData2={this.postData2}/>
        <CardBody style={{ margin: 0, padding: 0 }}>
          <Line key={Math.random()} data={this.chartData()} options={this.chartOptions()}/>
        </CardBody>
      </Card>
    );
  }
}

export default withCookies(DailyChart);