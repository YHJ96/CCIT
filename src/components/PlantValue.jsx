import React, { Component } from 'react';
import {
    Container,
    Col,
    Card,
    Table,
    Button,
    ButtonGroup,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    FormText,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
} from 'reactstrap';
import Axios from 'axios';
import { DataCry } from '../data/DataCry';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import CheckBox from '../data/CheckBox';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

class PlantValue extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.cropname = React.createRef();
        this.sector = React.createRef();
        this.leaflong = React.createRef();
        this.leafcnt = React.createRef();
        this.fruitweight = React.createRef();
        this.fruitwidth = React.createRef();
        this.fruitheight = React.createRef();
        this.fruitsugar = React.createRef();
        this.fruitacid = React.createRef();
        this.startdate = React.createRef();
        this.enddate = React.createRef();
        this.title = this.props.title;
        this.farmkey = this.props.farmkey
        this.state = {
            isModalCrop: false,
            isModalInfo: false,
            isModalChart: false,
            refresh: false,
            inforefresh: false,
            cropData: [],
            infoData: [],
            btnType: '',
            btnText: '작물선택',
            chartData: [],
            chartDate: [],
            chartValue: [],
            chartText: '작물선택',
            sectorText: '구역선택',
            dataText: '데이터선택',
        }
    }

    componentDidMount() {
        this.selectedCheckboxes = new Set();
        this.GetData();
        this.upDateInfo();
    }

     componentDidUpdate(prevProps, prevState) {
        if (this.state.refresh !== prevState.refresh) {
            this.GetData()
            console.log(`${this.state.refresh} ${prevState.refresh}`);
        } else if(this.state.inforefresh !== prevState.refresh) {
            this.upDateInfo();
        }
    }

    toggleCheckbox = item => {
        if (this.selectedCheckboxes.has(item)) {
            this.selectedCheckboxes.delete(item);
        } else {
            this.selectedCheckboxes.add(item);
        }
    }

    toggleInfo = () => {
        this.setState(({ isModalInfo }) => ({
            isModalInfo: !isModalInfo,
        }))
    }

    toggleCrop = () => {
        this.setState(({ isModalCrop }) => ({
            isModalCrop: !isModalCrop,
        }))
    }

    toggleChart = () => {
        this.setState(({ isModalChart }) => ({
            isModalChart: !isModalChart
        }))
    }

    GetData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/cropinfo";
        Axios.post(url,
            {
                farm_id: `${this.farmkey}`,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt': cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data.payload)
                if(res.data.statusCode === 309) {
                    return alert('권한이 없습니다.')
                }
                this.setState({
                    cropData: res.data.payload,
                    refresh: false,
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    postCropData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/cropinfo/add";
        Axios.post(url,
            {
                farm_id: `${this.farmkey}`,
                crop_type: this.cropname.current.value,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt': cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                this.setState({
                    refresh: true,
                })
                this.toggleCrop()
            })
            .catch((err) => {
                alert(err)
            })
    }

    deleteCropData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/cropinfo/remove";
        this.selectedCheckboxes.forEach((item) => {
            Axios.post(url,
                {
                    farm_id: `${this.farmkey}`,
                    crop_type: item,
                },
                {
                    headers: {
                        'x-date': days,
                        'x-accesskey': 'GSSIOT',
                        'x-signature': DataCry(url, days),
                        'jwt': cookies.get('jwt')
                    }
                }
            )
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        refresh: true,
                    })
                })
                .catch((err) => {
                    alert(err)
                })
        })
    }

    getInfoData = (item) => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/cropgrowth";
        Axios.post(url,
            {
                farm_id: `${this.farmkey}`,
                crop_type: item,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt': cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                const chartData = res.data.payload.map((item)=>({
                    NEWDATE : moment(item.DATE).format('YYYY-MM-DD'),
                    ITEM: item,
                }))
                console.log(chartData)
                this.setState({
                    infoData: res.data.payload,
                    btnType: item,
                    inforefresh: false,
                    btnText: item,
                    chartData: chartData,
                },()=>{console.log(this.state.btnType)})
            })
            .catch((err) => {
                alert(err)
            })
    }

    getChartData = (item) => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/cropgrowth";
        Axios.post(url,
            {
                farm_id: `${this.farmkey}`,
                crop_type: item,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt': cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                const chartData = res.data.payload.map((item)=>({
                    NEWDATE : moment(item.DATE).format('YYYY-MM-DD'),
                    ITEM: item,
                }))
                console.log(chartData)
                this.setState({
                    chartData: chartData,
                    chartText: item,
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    postInfoData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/cropgrowth/add";
        Axios.post(url,
            {
                farm_id: `${this.farmkey}`,
                crop_type: this.state.btnType,
                sector_id: this.sector.current.value,
                crop_leaf_long: this.leaflong.current.value,
                crop_leaf_cnt: this.leafcnt.current.value,
                crop_fruit_weight: this.fruitweight.current.value,
                crop_fruit_width: this.fruitwidth.current.value,
                crop_fruit_height: this.fruitheight.current.value,
                crop_fruit_sugar: this.fruitsugar.current.value,
                crop_fruit_acid: this.fruitacid.current.value,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt': cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                this.setState({
                    inforefresh: true,
                })
                this.toggleInfo()
            })
            .catch((err) => {
                alert(err)
            })
    }

    deleteInfoData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/cropgrowth/remove";
        this.selectedCheckboxes.forEach((item)=>{
            Axios.post(url,
                {
                    index: item,
                },
                {
                    headers: {
                        'x-date': days,
                        'x-accesskey': 'GSSIOT',
                        'x-signature': DataCry(url, days),
                        'jwt': cookies.get('jwt')
                    }
                }
            )
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        inforefresh: true,
                    })
                })
                .catch((err) => {
                    alert(err)
                })
        })
    }

    createCrobTable = () => {
        return this.state.cropData.map((item, index) => {
            return <tr key={index}>
                <th scope={'row'}>
                    <CheckBox
                        toggleCheckbox={() => { this.toggleCheckbox(item.CROP_TYPE) }} />
                </th>
                <td>{this.title}</td>
                <td>{item.CROP_TYPE}</td>
            </tr>
        })
    }

    createCrobButton = () => {
        return this.state.cropData.map((item, index) => {
            return <DropdownItem
                key={index}
                onClick={() => {
                    return this.getInfoData(item.CROP_TYPE);
                }}>
                {item.CROP_TYPE}
            </DropdownItem>
        })
    }

    createChartButton = () => {
        return this.state.cropData.map((item, index) => {
            return <DropdownItem
                key={index}
                onClick={() => {
                    return this.getChartData(item.CROP_TYPE);
                }}>
                {item.CROP_TYPE}
            </DropdownItem>
        })
    }

    createSectorButton = () => {
        const sectorText = this.state.chartData.filter((item, index) => {
            return (
                this.state.chartData.findIndex((item2) => {
                return item.ITEM.SECTOR_ID === item2.ITEM.SECTOR_ID;
              }) === index
            );
        });
        return sectorText.map((item, index) => {
            return <DropdownItem 
            key={index} 
            onClick={()=>{
                this.setState({
                    sectorText: item.ITEM.SECTOR_ID,
                })
            }
            }>
                {item.ITEM.SECTOR_ID}
            </DropdownItem>
        })
    }

    createDataButton = () => {
        const data = ['초장','엽수','과중','과폭','과장','당도','산도']
        return data.map((item, index) => {
            return <DropdownItem 
            key={index} 
            onClick={()=>{
                this.setState({
                    dataText: item,
                })
            }}>
            {item}</DropdownItem>
        })
    }

    upDateInfo = () => {
        return this.state.cropData.map((item)=>{
            return this.getInfoData(item.CROP_TYPE)
        })
    }

    createInfoTable = () => {
        return this.state.infoData.map((item, index) => {
            return <tr key={index}>
                <th scope={'row'}>
                    <CheckBox
                        toggleCheckbox={() => { this.toggleCheckbox(item.IDX) }} />
                </th>
                <td>{this.title}</td>
                <td>{item.CROP_TYPE}</td>
                <th>{item.SECTOR_ID}</th>
                <th>{item.CROP_LEAF_LONG}</th>
                <th>{item.CROP_LEAF_CNT}</th>
                <th>{item.CROP_FRUIT_WEIGTH}</th>
                <th>{item.CROP_FRUIT_WIDTH}</th>
                <th>{item.CROP_FRUIT_HEIGHT}</th>
                <th>{item.CROP_FRUIT_SUGAR}</th>
                <th>{item.CROP_FRUIT_ACID}</th>
            </tr>
        })
    }

    createChart = () => {
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        };
        
        const data = {
            labels: this.state.chartDate,
            datasets: [
                {
                    lineTension: 0.3,
                    label: `${this.state.chartText} ${this.state.sectorText}구역 ${this.state.dataText}`,
                    data: this.state.chartValue,
                    fill: false,
                    backgroundColor: 'rgb(86, 204, 242)',
                    borderColor: 'rgba(86, 204, 242, 0.2)',
                },
            ],
        };
        return <Line key={`${Math.random()}`} data={data} options={options} />
    }

    chartValue = () => {
        const startDate = new Date(`${this.startdate.current.value}`);
        const endDate = new Date(`${this.enddate.current.value}`);
        
        const resultData = this.state.chartData.filter(a => {
          const date = new Date(a.NEWDATE);
          return (date >= startDate && date <= endDate);
        });
        console.log(resultData)

        const filterData = resultData.filter((item)=>{
            return item.ITEM.SECTOR_ID === this.state.sectorText
        })

        console.log('filter',filterData)

        const mapDate = filterData.map((item)=>{
            return item.NEWDATE
        })

        console.log(mapDate)

        const mapData = filterData.map((item)=>{
            if(this.state.dataText === '초장') {
                return item.ITEM.CROP_LEAF_LONG
            } else if(this.state.dataText === '엽수') {
                return item.ITEM.CROP_LEAF_CNT
            } else if(this.state.dataText === '과중') {
                return item.ITEM.CROP_FRUIT_WEIGTH
            } else if(this.state.dataText === '과폭') {
                return item.ITEM.CROP_FRUIT_HEIGHT
            } else if(this.state.dataText === '과장') {
                return item.ITEM.CROP_FRUIT_WIDTH
            } else if(this.state.dataText === '당도') {
                return item.ITEM.CROP_FRUIT_SUGAR
            } else if(this.state.dataText === '산도') {
                return item.ITEM.CROP_FRUIT_ACID
            } return item
        })
       
        console.log(mapData)
        
        this.setState({
            chartValue: mapData,
            chartDate: mapDate,
        })
        this.toggleChart()
    }

    render() {
        return (
            <Container fluid>
                <Col md={12} style={{ height: '50vh', marginTop: '1%', }}>
                    <Card style={{ height: '85%', backgroundColor: '#2f3237' }}>
                        <Label style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fdfdfd' }}>작물정보</Label>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>농가이름</th>
                                    <th>작물명</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createCrobTable()}
                            </tbody>
                            <Modal isOpen={this.state.isModalCrop} toggle={this.toggleCrop}>
                                <ModalHeader>작물추가</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <FormText>작물명</FormText>
                                        <Input innerRef={this.cropname} />
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color={'primary'} onClick={this.postCropData}>확인</Button>
                                    <Button onClick={this.toggleCrop}>취소</Button>
                                </ModalFooter>
                            </Modal>
                        </Table>
                    </Card>
                    <ButtonGroup>
                        <Button color={'primary'} onClick={this.toggleCrop}>생성</Button>
                        <Button onClick={this.deleteCropData}>삭제</Button>
                    </ButtonGroup>
                </Col>

                <Col md={12} style={{ height: '50vh' }}>
                    <Card style={{ height: '85%', marginTop: '1%', backgroundColor: '#2f3237' }}>
                        <Label style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fdfdfd' }}>생육정보</Label>
                        <UncontrolledDropdown>
                            <DropdownToggle caret>{this.state.btnText}</DropdownToggle>
                            <DropdownMenu>
                                {this.createCrobButton()}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>농가이름</th>
                                    <th>작물명</th>
                                    <th>구역</th>
                                    <th>초장</th>
                                    <th>엽수</th>
                                    <th>과중</th>
                                    <th>과폭</th>
                                    <th>과장</th>
                                    <th>당도</th>
                                    <th>산도</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createInfoTable()}
                            </tbody>
                        </Table>
                        <Modal isOpen={this.state.isModalInfo} toggle={this.toggleInfo}>
                            <ModalHeader>생육정보추가</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <FormText>구역</FormText>
                                    <Input innerRef={this.sector} />
                                </FormGroup>
                                <FormGroup>
                                    <FormText>초장</FormText>
                                    <Input innerRef={this.leaflong} />
                                </FormGroup>
                                <FormGroup>
                                    <FormText>엽수</FormText>
                                    <Input innerRef={this.leafcnt} />
                                </FormGroup>
                                <FormGroup>
                                    <FormText>과중</FormText>
                                    <Input innerRef={this.fruitweight} />
                                </FormGroup>
                                <FormGroup>
                                    <FormText>과폭</FormText>
                                    <Input innerRef={this.fruitwidth} />
                                </FormGroup>
                                <FormGroup>
                                    <FormText>과장</FormText>
                                    <Input innerRef={this.fruitheight} />
                                </FormGroup>
                                <FormGroup>
                                    <FormText>당도</FormText>
                                    <Input innerRef={this.fruitsugar} />
                                </FormGroup>
                                <FormGroup>
                                    <FormText>산도</FormText>
                                    <Input innerRef={this.fruitacid} />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color={'primary'} onClick={this.postInfoData}>확인</Button>
                                <Button onClick={this.toggleInfo}>취소</Button>
                            </ModalFooter>
                        </Modal>
                    </Card>
                    <ButtonGroup>
                        <Button color={'primary'} onClick={this.toggleInfo}>생성</Button>
                        <Button onClick={this.deleteInfoData}>삭제</Button>
                    </ButtonGroup>
                </Col>

                <Col md={12} style={{ height: '50vh' }}>
                    <Card style={{ height: '85%', backgroundColor: '#2f3237' }}>
                        {this.createChart()}
                    </Card>
                    <ButtonGroup>
                        <Button onClick={this.toggleChart}>차트선택</Button>
                    </ButtonGroup>
                    <Modal isOpen={this.state.isModalChart} toggle={this.toggleChart}>
                        <ModalHeader>데이터선택</ModalHeader>
                        <ModalBody>

                            <FormGroup>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>{this.state.chartText}</DropdownToggle>
                                    <DropdownMenu>
                                        {this.createChartButton()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>

                            <FormGroup>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>{this.state.sectorText}</DropdownToggle>
                                    <DropdownMenu>
                                        {this.createSectorButton()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>

                            <FormGroup>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>{this.state.dataText}</DropdownToggle>
                                    <DropdownMenu>
                                        {this.createDataButton()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>

                            <FormGroup>
                                <Input type={'date'} innerRef={this.startdate} />
                            </FormGroup>

                            <FormGroup>
                                <Input type={'date'} innerRef={this.enddate} />
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                            <Button color={'primary'} onClick={this.chartValue}>확인</Button>
                            <Button onClick={this.toggleChart}>취소</Button>
                        </ModalFooter>
                    </Modal>
                </Col>
            </Container>
        );
    }
}

export default withCookies(PlantValue);