import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TinyAreaChart from './TinyAreaChart';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { DataCry } from '../../data/DataCry';
import Axios from 'axios';
import moment from 'moment';

class TrSystem extends PureComponent {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props) {
        super(props)
        this.props = props;
        this.farmkey = props.farmkey;
        this.state = {
            temp: 0,
            hum: 0,
            co2: 0,
            soilTemp: 0,
            soilHum: 0,
            ec: 0,
            ph: 0,
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
            farm_id: this.farmkey,
            start_date: moment().format('YYYYMMDD'),
            end_date: moment().format('YYYYMMDD')
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
            let temp = res.data.payload[0].TEMP;
            let hum = res.data.payload[0].HUMID;
            let co2 = res.data.payload[0].CO2;
            let soilTemp = res.data.payload[0].SOIL_TEMP;
            let soilhum = res.data.payload[0].SOIL_HUM;
            let ec = res.data.payload[0].EC;
            let ph = res.data.payload[0].PH;
            this.setState({
                temp: temp,
                hum: hum,
                co2: co2,
                soilTemp : soilTemp,
                soilhum: soilhum,
                ec: ec,
                ph: ph,
            })
        })
    }

    mapValue = (value) => {
        const { temp, hum, co2, soilTemp, soilHum, ec, ph } = this.state;
        if(value.valueID === 1) {
            return parseInt(temp);
        } else if (value.valueID === 2) {
            return parseInt(hum);
        } else if (value.valueID === 3) {
            return parseInt(co2);
        } else if(value.valueID === 4) {
            return parseInt(soilTemp);
        } else if(value.valueID === 5) {
            return parseInt(soilHum)
        } else if(value.valueID === 6) {
            return parseInt(ec);
        } else if (value.valueID === 7) {
            return parseInt(ph);
        }
    } 

    unitText = (value) => {
        if(value.valueID === 1) {
            return '℃';
        } else if (value.valueID === 2) {
            return '%';
        } else if (value.valueID === 3) {
            return 'PPM';
        } else if(value.valueID === 4) {
            return '℃';
        } else if(value.valueID === 5) {
            return '%';
        } else if(value.valueID === 6) {
            return 'ds/m';
        } else if (value.valueID === 7) {
            return 'pH';
        }
    } 

    render() {
        return (
            <tr>
                {
                    _.map(this.props.colors, (color, index) => {
                       return <td style={{ width: '20%' }} key={index}>
                           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h6 className="mb-0">
                                {this.props.title}
                            </h6>
                            <h6 className="mb-0">
                                {this.mapValue(color)}{this.unitText(color)}
                            </h6>
                            </div>
                            <TinyAreaChart
                                strokeColor={color.stroke}  
                                fillColor={color.fill}
                                valueID={color.valueID}
                                farmkey={this.farmkey}
                            />
                        </td>
                    })
                }
            </tr>
        );
    }
}

TrSystem.propTypes = {
    title: PropTypes.node,
    colors: PropTypes.array,
};
TrSystem.defaultProps = {
    colors: [
        {
            fill: "400",
            stroke: "primary"
        },
        {
            fill: "yellow",
            stroke: "400"
        },
        {
            fill: "purple",
            stroke: "info"
        },
        {
            fill: "success",
            stroke: "500"
        },
    ]
};

export default withCookies(TrSystem);