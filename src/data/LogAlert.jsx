import React, { PureComponent } from 'react';
import { UncontrolledAlert, CardTitle, CardText} from 'reactstrap';
import * as Icon from 'react-bootstrap-icons';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Axios from 'axios';
import { DataCry } from './DataCry';

class LogAlert extends PureComponent {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props)
        this.title = this.props.title;
        this.farmkey = this.props.farmkey;
        this.state = {
            log: [],
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
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
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                const filter = res.data.payload.filter((item)=>{
                    console.log(parseInt(cookies.get(`${this.farmkey}ftmin`)))
                    if (item.TEMP < parseInt(cookies.get(`${this.farmkey}ftmin`)) ||
                     item.TEMP > parseInt(cookies.get(`${this.farmkey}ftmax`)) ||
                     item.HUMID < parseInt(cookies.get(`${this.farmkey}fhmin`)) ||
                     item.HUMID > parseInt(cookies.get(`${this.farmkey}fhmax`)) || 
                     item.CO2 < parseInt(cookies.get(`${this.farmkey}fcmin`)) ||
                     item.CO2 > parseInt(cookies.get(`${this.farmkey}fcmax`))) {
                        return item
                    }
                    return false
                })
                this.setState({
                    log: filter
                }, ()=>{ console.log(this.state.log) })
            })
            .catch((err) => {
                alert(err)
            })
    }

    creatAlert = () => {
        return this.state.log.map((item)=>{
            console.log(item)
            return <UncontrolledAlert key={item.DATE} color={''} style={{background: '#555659'}}>
            <CardTitle style={{ height: '100%', display: 'flex', alignItems: 'center', color: '#53b8ea' }}>
            <Icon.RecordCircleFill style={{ marginRight: '1%' }}/>
            {this.title}</CardTitle>
            <CardText style={{ color: '#fdfdfd' }}>이상상황 발생하였습니다.</CardText>
        </UncontrolledAlert>
        })
    }

    render() {
        return (
            <>
            {this.creatAlert()}
            </>
        );
    }
}

export default withCookies(LogAlert);