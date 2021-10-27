import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell } from 'recharts';
import Colors from './Colors';

class TinyDonutChart extends Component {
    constructor(props){
        super(props)
        this.props = props;
    }
    render() {
        const data = [
            {name: 'Group A', value: 40+Math.random() * 100},
            {name: 'Group B', value: Math.random() * 100}
        ];
        return (
            <PieChart width={80} height={80}>
            <Pie
                data={data}
                dataKey="value"
                stroke={ Colors[ this.props.strokeColor ] }
                innerRadius={ 28 }
                outerRadius={ 35 } 
                fill={ Colors[ this.props.pieBg ] }
            >
                  <Pie data={data} dataKey="value" nameKey="name" cx={'50%'} cy={'50%'} innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            <Cell fill={ Colors[ this.props.pieColor ] }/>
            </Pie>
        </PieChart>
        );
    }
}

TinyDonutChart.propTypes = {
    pieColor: PropTypes.string,
    strokeColor: PropTypes.string,
    pieBg: PropTypes.string
};
TinyDonutChart.defaultProps = {
    pieColor: "primary",
    strokeColor: "white",
    pieBg: "200"
};

export default TinyDonutChart;