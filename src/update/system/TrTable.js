import React, { PureComponent } from 'react';
import TrSystem from './TrSystem';
import { Table } from 'reactstrap';
import { farmdata } from '../../data/FarmData';

class TrTable extends PureComponent {

    createTrySys = () => {
        const TrColors =  [
            {
                fill: "orange05",
                stroke: "orange",
                valueID: 1,
            },
            {
                fill: "yellow05",
                stroke: "yellow",
                valueID: 2,
            },
            {
                fill: "cyan05",
                stroke: "cyan",
                valueID: 3,
            },
            {
                fill: "facebook05",
                stroke: "facebook",
                valueID: 4,
            },
            {
                fill: "purple05",
                stroke: "purple",
                valueID: 5,
            },
            {
                fill: "pink05",
                stroke: "pink",
                valueID: 6,
            },            {
                fill: "primary05",
                stroke: "primary",
                valueID: 7,
            }
        ]
        return farmdata.map((item, index) => {
            return <TrSystem
            farmkey={item.farmkey}
            title={item.title} 
            colors={TrColors}
            key={index}
        />
        })
    }
    render() {
        return (
            <>
            <Table responsive dark style={{ color: '#fdfdfd' }}>
                <thead>
                    <tr>
                        <th>온도</th>
                        <th>습도</th>
                        <th>CO2</th>
                        <th>지온</th>
                        <th>지습</th>
                        <th>EC</th>
                        <th>PH</th>
                    </tr>
                </thead>
                <tbody>
                    {this.createTrySys()}
                </tbody>
            </Table>
            </>
        );
    }
}

export default TrTable;