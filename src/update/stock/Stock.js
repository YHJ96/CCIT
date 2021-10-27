import React, { PureComponent } from 'react';
import TableStock from './TableStock';
import { Table, Card, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { CaretDown, CaretUp } from 'react-bootstrap-icons';
import { DataCry } from '../../data/DataCry';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import Axios from 'axios';
import Checkbox from '../../data/MarketCheckBox';

class Stock extends PureComponent {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.state = {
            cropCode: [],
            marketCode: [],
            choiceCrop: [],
            isCheck: false,
            cropData : [],
            cropData2 : [],
        }
    }

    componentDidMount() {
        this.selectCheckBox = new Set();
        this.getData();
    }

    getData = async () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/market-price/info";
        await Axios.post(url,
            {/* Body */ },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt': cookies.get('jwt')
                }
            }).then((res) => {
                console.log(res.data.payload)
                this.setState({
                    cropCode: res.data.payload.resultCrop,
                    marketCode: res.data.payload.resultMarket
                })
            })
    }

    toggleCheckbox = (item) => {
        if (this.selectCheckBox.has(item)) {
            this.selectCheckBox.delete(item);
        } else this.selectCheckBox.add(item);
    }

    toggleIsCheck = () => {
        this.setState(({ isCheck }) => ({
            isCheck: !isCheck
        }))
    }

    createCheckBox = () => {
        return this.state.cropCode.map((item, index) => {
            return <div key={index} style={{ display: 'flex' }}>
                <Checkbox index={index} toggleCheckbox={() => this.toggleCheckbox(item)}></Checkbox>
                <span style={{ marginLeft: 10, fontWeight: 300 }}>{item.MP_CROP_NAME}</span>
            </div>
        })
    }

    resetChoice = () => {
        this.setState({
            choiceCrop : [],
            cropData : [],
            cropData2 : []
        })
    }

    postData = async() => {
        this.resetChoice();
        this.getDataGalack();
        this.getDataGangSou();
        this.toggleIsCheck();
    }

    getDataGalack = () => {
        this.selectCheckBox.forEach((item) => {
            console.log(item);
            const { cookies } = this.props;
            const days = Date.now().toString();
            const url = "http://192.168.0.1/market-price/price";
            Axios.post(url,
                {
                    crop_code: item.MP_CROP_CODE,
                    market_code: "110001"
                },
                {
                    headers: {
                        'x-date': days,
                        'x-accesskey': 'GSSIOT',
                        'x-signature': DataCry(url, days),
                        'jwt': cookies.get('jwt')
                    }
                }).then((res) => {
                    console.log(res)
                    this.setState(({ choiceCrop, cropData }) => ({
                        choiceCrop: choiceCrop.concat(item),
                        cropData: cropData.concat(res.data.payload)
                    }),()=>{console.log('1' , this.state.cropData)})
                })
        })
    }
    getDataGangSou = () => {
        this.selectCheckBox.forEach((item) => {
            console.log(item);
            const { cookies } = this.props;
            const days = Date.now().toString();
            const url = "http://192.168.0.1/market-price/price";
            Axios.post(url,
                {
                    crop_code: item.MP_CROP_CODE,
                    market_code: "110008"
                },
                {
                    headers: {
                        'x-date': days,
                        'x-accesskey': 'GSSIOT',
                        'x-signature': DataCry(url, days),
                        'jwt': cookies.get('jwt')
                    }
                }).then((res) => {
                    console.log(res)
                    this.setState(({ cropData2 }) => ({
                        cropData2: cropData2.concat(res.data.payload)
                    }),()=>{console.log('1' , this.state.cropData)})
                })
        })
    }

    createTableIndex = () => {
        return this.state.choiceCrop.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <td className="bt-0">
                        <h4 className="mb-1">
                            {item.MP_CROP_NAME}
                        </h4>
                    </td>
                </React.Fragment>
            )
        })
    }

    render() {
        console.log(this.state.choiceCrop);
        return (
            <Card style={{ height: '90%', width: '100%', background: '#2F3237' }}>
                <CardBody>
                    <Table responsive size="sm" className="mb-2 text-nowrap" style={{ color: '#fdfdfd' }} onClick={this.toggleIsCheck}>
                        <thead>
                            <tr>
                                <td className="bt-0">
                                    <h4 className="mb-1">
                                        경락시세
                                    </h4>
                                    {/*전일대비시세*/}
                                </td>
                                {this.createTableIndex()}
                            </tr>
                        </thead>
                        <tbody>
                            <TableStock cropData={this.state.cropData} cropData2={this.state.cropData2}/>
                        </tbody>
                    </Table>

                    <Modal isOpen={this.state.isCheck} toggle={this.toggleIsCheck}>
                        <ModalHeader toggle={this.toggleIsCheck}>{'작물선택'}</ModalHeader>
                        <ModalBody>
                            {this.createCheckBox()}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.postData}>{'확인'}</Button>{' '}
                            <Button color="secondary" onClick={this.toggleIsCheck}>{'취소'}</Button>
                        </ModalFooter>
                    </Modal>

                </CardBody>
            </Card>
        );
    }
}

export default withCookies(Stock);