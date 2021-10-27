import React, { PureComponent } from 'react';
import { Card ,CardBody, Label, CardText, CardImg } from 'reactstrap';
import { WeatherImg, WeatherText } from '../../data/WeatherImage';
import * as Icon from 'react-bootstrap-icons';
import moment from 'moment';
import { inject, Observer } from 'mobx-react';
import { toJS } from 'mobx';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from 'react-cookie';

@inject('weatherstore')
@Observer

class DailyWeather extends PureComponent {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    constructor(props){
        super(props)
        this.cookies = this.props.cookies;
        this.postDailyData = this.props.weatherstore.postDailyData;
        this.postWeekData = this.props.weatherstore.postWeekData;
        this.delay = 1000
        this.state = {
            isLoding : false
        }
    }

    componentDidMount () {
        this.postDailyData_();
        this.postWeekData_();
        this.weatherDayInfo = setInterval(this.postDailyData_, this.delay * 60 * 30)
        this.weatherWeekInfo = setInterval(this.postWeekData_, this.delay * 60 * 60 * 1)
    }

    componentWillUnmount () {
        clearInterval(this.weatherDayInfo)
        clearInterval(this.weatherWeekInfo)
    }

    isRender = () => {
        this.setState(({isLoding})=>({
            isLoding: !isLoding
        }))
    }

    postDailyData_ = async() => {
        await this.postDailyData(this.cookies).then(() => {
            this.isRender();
        })
    }

    postWeekData_ = async() => {
        await this.postWeekData(this.cookies).then(() => {
            this.isRender();
        })
    }

    createWeek = () => {
        const weekData = toJS(this.props.weatherstore.weekData);
        return weekData.map((item, index) => {
            return <CardText key={index} tag={'div'} style={{ display: 'flex', flexDirection: 'column', marginLeft: '2%', justifyContent: 'center', alignItems: 'center' }}>
            <CardText tag={'span'} style={{ fontSize: '16px' }}>{`${moment().add(`${index - 1}`, 'days').format('MMMM.D')}`}</CardText>
            <CardImg style={{ width: '30px', height: '30px' }} src={WeatherImg(item.weather[0].main)}/>
            </CardText>
        })
    }

    render() {
        let { temp, hum, condition } = this.props.weatherstore;
        return (
            <Card style={{ height: '98%', marginTop: '2%', background: '#2f3237', color: '#fdfdfd' }}>
                <Label style={{ margin: 0, padding: 0, fontSize: 18 }}>{`실시간 날씨 상황`}</Label>
                <CardBody style={{ margin: 0, padding: 0}}>
                    <CardText tag={'div'} style={{ marginLeft: '5px' }}><Icon.GeoAlt/>{` GoYang-Si ${`Today, ${moment().format('MMMM Do')}`}`}</CardText>
                    
                    <CardText tag={'div'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: '2%' }}>
                    
                    <CardText tag={'div'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardImg src={WeatherImg(condition)} style={{ width: 40, height: 40 }}/>
                    <CardText style={{ fontSize: 15 }}>{WeatherText(condition)}</CardText>
                    </CardText>

                    <CardText tag={'div'} style={{ display: 'flex', flexDirection: 'column' }}>
                    <CardText style={{ padding: 0, margin: 0 }}>{`온도: ${temp}℃`}</CardText>
                    <CardText style={{ padding: 0, margin: 0 }}>{`습도: ${hum}%`}</CardText>
                    </CardText>
                    </CardText>

                    <Label style={{ margin: 0, padding:0, width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <CardText style={{ width: '80%', height: '2px', background: 'gray' }}>{''}</CardText>
                    </Label>

                    <CardText tag={'div'} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        {this.createWeek()}
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default withCookies(DailyWeather);