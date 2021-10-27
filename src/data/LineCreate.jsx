import React, { Component } from 'react';
import LineChart from './LineChart';

 const API_KEY = [
    {
        id: 1,
        value: 1,
        CHART_API : `http://192.168.0.150:3001/alldata?id=1&pdate=20210326&ndate=20210327`
    },
    {
        id: 2,
        value: 2,
        CHART_API : `http://192.168.0.150:3001/alldata?id=2&pdate=20210326&ndate=20210327`
    },
]

class LineCreate extends Component {

    createChart = () => {
        return API_KEY.map((item)=>{
            return <LineChart key={item.id} value={item.value} CHART_API={item.CHART_API}/>
        })
    }
    render() {
        return (
            <div>
                {this.createChart()}
            </div>
        );
    }
}

export default LineCreate;