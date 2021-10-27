import React, { Component } from 'react';

class TableStock extends Component {

    createTableValue = () => {
        const { cropData } = this.props;
        return cropData.map((item, index) => {
            return <td key={index} className="align-middle">
                <span className="text-inverse">{`${item.sbidPric}￦(${item.delngPrut}kg)`}</span>
            </td>
        })
    }

    createTableValue2 = () => {
        const { cropData2 } = this.props;
        return cropData2.map((item, index) => {
            return <td key={index} className="align-middle">
                <span className="text-inverse">{`${item.sbidPric}￦(${item.delngPrut}kg)`}</span>
            </td>
        })
    }

    render() {
        return (
            <>
                <tr>
                    <td className="align-middle">
                        {'가락시장'}
                    </td>
                    {this.createTableValue()}
                </tr>
                <tr>
                    <td className="align-middle">
                        {'강서시장'}
                    </td>
                    {this.createTableValue2()}
                </tr>
            </>
        );
    }
}

export default TableStock;