import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ResponsiveContainer, BarChart, Bar} from 'recharts';
import { Colors } from './Colors';

class TinyBarChart extends Component {
    constructor(props){
        super(props)
        this.props = props;
    }
    render() {
        const data = _.times(40, () => ({ pv: 20 + Math.random() * 100 }));
        return (
            <ResponsiveContainer width='100%' height={ 30 }>
                <BarChart data={data} margin={{ top: 0, bottom: 0, right: 0, left: 0 }}>
                    <Bar dataKey='pv' stroke={ Colors[this.props.barStrokeColor] } fill={ Colors[ this.props.barColors ] } />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

TinyBarChart.propTypes = {
    barColors: PropTypes.string,
    barStrokeColor: PropTypes.string,
};
TinyBarChart.defaultProps = {
    barColors: "primary",
    barStrokeColor: "primary"
};

export default TinyBarChart;