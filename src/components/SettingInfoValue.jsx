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
    Input 
} from 'reactstrap';
import Axios from 'axios';
import { DataCry } from '../data/DataCry';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import CheckBox from '../data/CheckBox';

class SettingInfoValue extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props)
        const { title, farmkey } = this.props;
        this.name = React.createRef();
        this.maker = React.createRef();
        this.title = title;
        this.farmkey = farmkey;
        this.state = {
            isModalSensor: false,
            isModalMoter: false,
            refresh: false,
            sensorData: [],
            moterData: [],
        }
    }

    componentDidMount () {
        this.selectedCheckboxes = new Set();
        this.GetData()
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.refresh !== prevState.refresh) {
            this.GetData();
            console.log(`${this.state.refresh} ${prevState.refresh}`);
        }
    }

    toggleCheckbox = item => {
        if (this.selectedCheckboxes.has(item)) {
            this.selectedCheckboxes.delete(item);
        } else {
            this.selectedCheckboxes.add(item);
        }
    }

    deleteData = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        this.selectedCheckboxes.forEach((item)=>{
            const { cookies } = this.props;
            const days = Date.now().toString();
            const url = "http://192.168.0.1/api/dev/remove";
            console.log(cookies.get('jwt'))
            Axios.post(url,
                {
                    dev_id: item,
                },
                {
                    headers: {
                        'x-date': days,
                        'x-accesskey': 'GSSIOT',
                        'x-signature': DataCry(url, days),
                        'jwt' : cookies.get('jwt')
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

    createSensorTable = () => {
        return this.state.sensorData.map((item, index)=>{
            return <tr key={index}>
                <th scope={'row'}>
                    <CheckBox 
                    toggleCheckbox={() => {this.toggleCheckbox(item.DEV_ID)}}/>
                </th>
                <td>{this.title}</td>
                <td>{item.DEV_NAME}</td>
                <td>{item.DEV_MAKER}</td>
            </tr>
        })
    }

    createMoterTable = () => {
        return this.state.moterData.map((item, index)=>{
            return <tr key={index}>
                <th scope={'row'}>
                    <CheckBox 
                    toggleCheckbox={() => {this.toggleCheckbox(item.DEV_ID)}}/>
                </th>
                <td>{this.title}</td>
                <td>{item.DEV_NAME}</td>
                <td>{item.DEV_MAKER}</td>
            </tr>
        })
    }

    toggleSensor = () => {
        this.setState(({isModalSensor})=>({
            isModalSensor: !isModalSensor,
        }))
    }

    toggleMotor = () => {
        this.setState(({isModalMoter})=>({
            isModalMoter: !isModalMoter,
        }))
    }

    PostSensorData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/dev/add";
        console.log(cookies.get('jwt'))
        Axios.post(url,
            {
                farm_id : `${this.farmkey}`,
                dev_type: '1',
                dev_name: this.name.current.value,
                dev_maker: this.maker.current.value,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt' : cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                this.setState({
                    refresh: true,
                })
                this.toggleSensor();
            })
            .catch((err) => {
                alert(err)
            })
    }

    PostMoterData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/dev/add";
        console.log(cookies.get('jwt'))
        Axios.post(url,
            {
                farm_id : `${this.farmkey}`,
                dev_type: '2',
                dev_name: this.name.current.value,
                dev_maker: this.maker.current.value,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt' : cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                this.setState({
                    refresh: true,
                })
                this.toggleMotor();
            })
            .catch((err) => {
                alert(err)
            })
    }

    GetData = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/dev";
        Axios.post(url,
            {
                farm_id : `${this.farmkey}`,
            },
            {
                headers: {
                    'x-date': days,
                    'x-accesskey': 'GSSIOT',
                    'x-signature': DataCry(url, days),
                    'jwt' : cookies.get('jwt')
                }
            }
        )
            .then((res) => {
                console.log(res.data)
                if(res.data.statusCode === 309) {
                    return alert('권한이 없습니다.')
                }
                const data1 = res.data.payload.filter((item)=>{
                    return item.DEV_TYPE === '1'
                })
                const data2 = res.data.payload.filter((item)=>{
                    return item.DEV_TYPE === '2'
                })
                this.setState({
                    sensorData: data1,
                    moterData: data2,
                    refresh: false,
                },()=>{
                    console.log(
                    '센서데이터',
                    this.state.sensorData, 
                    '모터데이터',
                    this.state.moterData)
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    render() {
        return (
            <Container fluid>
                <Col md={12} style={{ height: '50vh' }}>
                    <Card style={{ height: '85%', marginTop: '1%', backgroundColor: '#2f3237'}}>
                        <Label style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fdfdfd' }}>센서정보</Label>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>농가이름</th>
                                    <th>센서명</th>
                                    <th>제조사</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createSensorTable()}
                            </tbody>
                        </Table>
                        <ButtonGroup style={{ display: 'flex', width: '10%' }}>
                            <Button color={'primary'} onClick={this.toggleSensor}>생성</Button>
                            <Button onClick={this.deleteData}>삭제</Button>
                        </ButtonGroup>
                        <Modal isOpen={this.state.isModalSensor} toggle={this.toggleSensor}>
                            <ModalHeader>센서추가</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <FormText>센서명</FormText>
                                    <Input innerRef={this.name}/>
                                </FormGroup>
                                <FormGroup>
                                    <FormText>제조사</FormText>
                                    <Input innerRef={this.maker}/>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color={'primary'} onClick={this.PostSensorData}>확인</Button>
                                <Button onClick={this.toggleSensor}>취소</Button>
                            </ModalFooter>
                        </Modal>
                    </Card>
                </Col>
                <Col md={12} style={{ height: '50vh' }}>
                    <Card style={{ height: '85%', backgroundColor: '#2f3237' }}>
                        <Label style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fdfdfd' }}>장비정보</Label>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>농가이름</th>
                                    <th>장비명</th>
                                    <th>제조사</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createMoterTable()}
                            </tbody>
                        </Table>
                        <ButtonGroup style={{ display: 'flex', width: '10%', }}>
                            <Button color={'primary'} onClick={this.toggleMotor}>생성</Button>
                            <Button onClick={this.deleteData}>삭제</Button>
                        </ButtonGroup>
                        <Modal isOpen={this.state.isModalMoter} toggle={this.toggleMotor}>
                            <ModalHeader>장비추가</ModalHeader>
                            <ModalBody>
                            <FormGroup>
                                    <FormText>장비명</FormText>
                                    <Input innerRef={this.name}/>
                                </FormGroup>
                                <FormGroup>
                                    <FormText>제조사</FormText>
                                    <Input innerRef={this.maker}/>
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color={'primary'} onClick={this.PostMoterData}>확인</Button>
                                <Button onClick={this.toggleMotor}>취소</Button>
                            </ModalFooter>
                        </Modal>
                    </Card>
                </Col>
            </Container>
        );
    }
}

export default withCookies(SettingInfoValue);