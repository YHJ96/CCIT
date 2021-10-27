import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Colors } from './Colors';
import Axios from 'axios';
import { DataCry } from '../../data/DataCry'
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';
import moment from 'moment';

class TinyAreaChart extends PureComponent {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    
    constructor(props){
        super(props)
        this.props = props;
        this.farmkey = props.farmkey;
        this.valueID = props.valueID;
        this.state = {
            temp: [],
            hum: [],
            co2: [],
            soilTemp: [],
            soilHum: [],
            ec: [],
            ph: [],
        }
    }

    componentDidMount () {
        this.postHour();
    }

    postHour = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = `http://192.168.0.1/api/env/avg-hour`;
        Axios.post(url,
          {
            farm_id: this.farmkey,
            start_date: moment().subtract('1', 'days').format('YYYYMMDD'),
            end_date: moment().subtract('1', 'days').format('YYYYMMDD')
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
            console.log(res.data)
            let temp = res.data.payload.map((item)=>{
                return ({pv : item.TEMP})
            })
            let hum = res.data.payload.map((item)=>{
                return ({pv : item.HUMID})
            })
            let co2 = res.data.payload.map((item)=>{
                return ({ pv: item.CO2 })
            })
            let soilTemp = res.data.payload.map((item)=>{
                return ({ pv: item.SOIL_TEMP })
            })
            let soilHum = res.data.payload.map((item)=>{
                return ({ pv: item.SOIL_HUM })
            })
            let ec = res.data.payload.map((item)=>{
                return ({ pv: item.EC })
            })
            let ph = res.data.payload.map((item)=>{
                return ({ pv: item.PH })
            })
            this.setState({
                temp,
                hum,
                co2,
                soilTemp,
                soilHum,
                ec,
                ph,
            })
        })
    }

    mapValue = () => {
        if(this.valueID === 1) {
            return this.state.temp;
        } else if (this.valueID === 2) {
            return this.state.hum;
        } else if (this.valueID === 3) {
            return this.state.co2;
        } else if (this.valueID === 4) {
            return this.state.soilTemp;
        } else if (this.valueID === 5) {
            return this.state.soilHum;
        } else if (this.valueID === 6) {
            return this.state.ec;
        } else if (this.valueID === 7) {
            return this.state.ph;
        }
    }

    render() {
        return (
            <ResponsiveContainer width='100%' minWidth='150px' height={40}>
                <AreaChart data={this.mapValue()}>
                    <Area dataKey='pv' stroke={Colors[this.props.strokeColor]} fill={Colors[this.props.fillColor]} />
                </AreaChart>
            </ResponsiveContainer>
        );
    }
}

TinyAreaChart.propTypes = {
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string
};
TinyAreaChart.defaultProps = {
    strokeColor: "600",
    fillColor: "200",
};

export default withCookies(TinyAreaChart);