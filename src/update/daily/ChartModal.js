import React, { PureComponent } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, FormText, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import moment from 'moment';

class ChartModal extends PureComponent {
    constructor(props) {
        super(props)
        this.toggle = this.props.toggle;
        this.postDataValue = this.props.postDataValue;
        this.farmType = this.props.farmType;
        this.postData1 = this.props.postData1;
        this.postData2 = this.props.postData2;
        this.startDate = React.createRef();
        this.endDate = React.createRef();
        this.state = {
            sensorName : '센서선택',
            sensorValue : '',
        }
    }

    makeBtnItem = () => {
        const btnItem = [
            '온도','습도','CO2','지온','지습','EC','pH'
        ]
        return btnItem.map((item, index) => {
            return <DropdownItem key={index} onClick={()=>this.makeText(item)}>{item}</DropdownItem>
        }) 
    }

    makeText = (value) => {
        if(value === '온도') {
            return this.setState({
                sensorName: '온도',
                sensorValue: 'TEMP'
            })
        } else if(value === '습도') {
            return this.setState({
                sensorName: '습도',
                sensorValue: 'HUMID',
            })
        } else if(value === 'CO2') {
            return this.setState({
                sensorName: 'CO2',
                sensorValue: 'CO2',
            })
        } else if(value === '지온') {
            return this.setState({
                sensorName: '지온',
                sensorValue: 'SOIL_TEMP'
            })
        } else if(value === '지습') {
            return this.setState({
                sensorName: '지습',
                sensorValue: 'SOIL_HUM'
            })
        } else if(value === 'EC') {
            return this.setState({
                sensorName: 'EC',
                sensorValue: 'EC',
            })
        } else if(value === 'pH') {
            return this.setState({
                sensorName: 'pH',
                sensorValue: 'PH',
            })
        }
    }

    postDateRef = () => {
        this.postData1(moment(this.startDate.current.value).format('YYYYMMDD'),moment(this.endDate.current.value).format('YYYYMMDD'),this.state.sensorValue)
        this.postData2(moment(this.startDate.current.value).format('YYYYMMDD'),moment(this.endDate.current.value).format('YYYYMMDD'),this.state.sensorValue)
        this.farmType(this.state.sensorValue)
        this.toggle();
    }

    render() {
        let isOpen = this.props.isOpen;
        return (
            <Modal isOpen={isOpen} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>차트 데이터 선택</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormText>센서선택</FormText>
                            <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {this.state.sensorName}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.makeBtnItem()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                        </FormGroup>

                        <FormGroup>
                            <FormText>조회시작날짜</FormText>
                            <Input innerRef={this.startDate} tag={'input'} type={'date'} />
                        </FormGroup>

                        <FormGroup>
                            <FormText>조회끝날짜</FormText>
                            <Input innerRef={this.endDate} tag={'input'} type={'date'} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.postDateRef}>확인</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>취소</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ChartModal;