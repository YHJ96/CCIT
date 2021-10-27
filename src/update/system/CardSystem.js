import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, Badge } from 'reactstrap';
import TinyDonutChart from './TinyDonutChart';
import TinyBarChart from './TinyBarChart';
import { Colors } from './Colors';
import Axios from 'axios';
import { DataCry } from '../../data/DataCry';
import { Cookies, withCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class CardSystem extends PureComponent {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props)
        this.props = props;
        this.farmkey = props.farmkey;
        this.delay = 1000 * 5;
        this.state = {
            farmValue : [],
            isLoding : 0
        }
    }

    randomArray = (arr) => {
        const index = Math.round(Math.random() * (arr.length - 1));
        return arr[index];
    }

    componentDidMount () {
        this.postData();
        this.farmInfo = setInterval(this.postData, this.delay)
    }

    componentWillUnmount () {
        clearInterval(this.farmInfo)
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
                if(this.props.ifid1) {
                if(this.state.isLoding < 3) {
                    this.setState(({isLoding}) => ({
                        farmValue: res.data.payload[0],
                        isLoding: isLoding + 1,
                    }))
                } else if(this.state.isLoding === 3) {
                    this.setState({
                        farmValue: res.data.payload[0],
                        isLoding: 1,
                    })
                }
            } else if(this.props.ifid2) {
                if(this.state.isLoding < 4) {
                    this.setState(({isLoding}) => ({
                        farmValue: res.data.payload[0],
                        isLoding: isLoding + 1,
                    }))
                } else if(this.state.isLoding === 4) {
                    this.setState({
                        farmValue: res.data.payload[0],
                        isLoding: 1,
                    })
                }
            }
            })
            .catch((err) => {
                alert(err)
            })
    }

    badgeName = () => {
        let { isLoding } = this.state;
        if(this.props.ifid1) {
        if(isLoding === 1) {
            return '온도';
        } else if (isLoding === 2) {
            return '습도';
        } else if (isLoding === 3) {
            return 'CO2';
        }
    } else if(this.props.ifid2) {
        if(isLoding === 1) {
            return '지온';
        } else if(isLoding === 2) {
            return '지습';
        } else if(isLoding === 3) {
            return 'EC';
        } else if(isLoding === 4) {
            return 'pH';
        }
    }
    }

    unitText = () => {
        let { isLoding } = this.state;
        if(this.props.ifid1) {
        if(isLoding === 1) {
            return '℃';
        } else if (isLoding === 2) {
            return '%';
        } else if (isLoding === 3) {
            return 'PPM';
        }
    } else if(this.props.ifid2) {
        if(isLoding === 1) {
            return '℃';
        } else if(isLoding === 2) {
            return '%';
        } else if(isLoding === 3) {
            return 'ds/m';
        } else if (isLoding === 4) {
            return 'pH';
        }
    }
    }

    farmValueSet = () => {
        let { isLoding, farmValue } = this.state;
        if(this.props.ifid1) {
        if(isLoding === 1) {
            return farmValue.TEMP;
        } else if (isLoding === 2) {
            return farmValue.HUMID;
        } else if (isLoding === 3) {
            return farmValue.CO2;
        }
    } else if(this.props.ifid2) {
        if(isLoding === 1) {
            return farmValue.SOIL_TEMP;
        } else if (isLoding === 2 ) {
            return farmValue.SOIL_HUM;
        } else if (isLoding === 3) {
            return farmValue.EC;
        } else if (isLoding === 4) {
            return farmValue.PH
        }
    }
    }

    render() {
        return (
            <Card style={{ background: '#2f3237' }}>
            <CardBody style={{ margin: '3%', padding: 0, }}>
                <div style={{ display: 'flex' }}>
                    <span>
                         <Badge style={{ marginBottom: '2%', background: `${Colors[this.props.badgeColor]}` }} pill>
                             { this.badgeName() }
                         </Badge>
                         <h5 style={{ marginBottom: 0, color: '#fdfdfd'}}>
                             { this.props.title }
                         </h5>
                         <h4 style={{ marginLeft: '2%', color: '#fdfdfd', width: '100%' }}>
                             { this.farmValueSet() }{ this.unitText() }
                         </h4>
                     </span>
                     <span style={{ marginLeft: 'auto', textAlign: 'right' }}>
                         <TinyDonutChart 
                             pieColor={this.props.pieColor}
                         />
                     </span>
                 </div>
                 <TinyBarChart 
                   barStrokeColor = {this.props.barStrokeColor}
                   barColors = {this.props.barColors}
                 />
            </CardBody>
         </Card>
        );
    }
}

CardSystem.propTypes = {
    BadgeName: PropTypes.node,
    title: PropTypes.node,
    badgeColor: PropTypes.string,
    unit: PropTypes.node,
    pieColor: PropTypes.string
};
CardSystem.defaultProps = {
    BadgeName: '이름',
    title: "Waiting...",
    badgeColor: "secondary",
    unit: "%",
    pieColor: "500"
};

export default withCookies(CardSystem);