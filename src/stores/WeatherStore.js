import { observable, action } from 'mobx';
import Axios from 'axios';
import { DataCry } from '../data/DataCry';

class WeatherStore {
    @observable temp = 0;
    @observable hum = 0;
    @observable condition = '';
    @observable weekData = [];
    @observable windSpeed = 0;
    @observable windDeg = 0;

    @action tempSet = (value) => {
        this.temp = parseInt(value - 273);
    }

    @action humSet = (value) => {
        this.hum = value;
    }

    @action conditionSet = (value) => {
        this.condition = value; 
    }

    @action windSpeedSet = (value) => {
        this.windSpeed = value;
    }

    @action windDegSet = (value) => {
        this.windDeg = value;
    }
    
    postDailyData = async(cookies) => {
        const days = Date.now().toString();
        const url = 'http://192.168.0.1/weather/day';
        await Axios.post(url, 
            {
                user_id: `${cookies.get('id')}`,
                farm_id: `${this.farmkey}`
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                }
            }
        ).then((res) => {
            let temp = res.data.payload.main.temp;
            let hum = res.data.payload.main.humidity;
            let condition = res.data.payload.weather[0].main;
            let windSpeed = res.data.payload.wind.speed;
            let windDeg = res.data.payload.wind.deg;

            this.tempSet(temp);
            this.humSet(hum);
            this.conditionSet(condition);
            this.windSpeedSet(windSpeed);
            this.windDegSet(windDeg);
        })
    }

    postWeekData = async(cookies) => {
        const days = Date.now().toString();
        const url = 'http://192.168.0.1/weather/week';
        await Axios.post(url, 
            {
                user_id: `${cookies.get('id')}`,
                farm_id: `${this.farmkey}`
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                }
            }
        ).then((res) => {
            this.weekData.splice(0, this.weekData.length);
            return this.weekData.push(
                res.data.payload.daily[1], 
                res.data.payload.daily[2], 
                res.data.payload.daily[3], 
                res.data.payload.daily[4],
                res.data.payload.daily[5]
            )
        })
    }
}

export default WeatherStore;