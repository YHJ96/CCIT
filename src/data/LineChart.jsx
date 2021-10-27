import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from 'axios';

class LineChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            ChartData: [],
        }
        const {CHART_API} = this.props;
        this.CHART_API = CHART_API
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = async() => {
        await Axios.get(this.CHART_API)
        .then((res)=>{
            this.setState({
                ChartData : res.data,
            })
            console.log(this.state.ChartData)
        })
    }

    test = () => {
        const { value } = this.props;
        const data = {
            datasets: [{
                label: `Value`,
                data: this.state.ChartData, // 실제 데이터
                fill: false, // 그래프를 가득 채우는 기능
                backgroundColor: 'rgb(255, 99, 132)', // 선 색깔
                borderColor: 'rgba(255, 99, 132, 0.2)', // 점 색깔
                parsing: { // X축 Y축 정제 없이 사용할 수 있음 
                    xAxisKey: 'time', // X축 Object Key값
                    yAxisKey: 'sens_value', // Y축 Object Key값
                }
            }]
        }
        console.log(this.state.ChartData)
        return <div>
            <Line data={data}/>
        </div>
    }

    render() {
        return (
            <>
            {this.test()}
            </>
        );
    }
}

export default LineChart;