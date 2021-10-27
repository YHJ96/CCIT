import React, { PureComponent, createRef } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText } from 'reactstrap';
import { FARMBUTTON, FARMCOMPAREBUTTON, SENSORBUTTON, TICKBUTTON } from '../data/DataSearchMultiData';
import moment from 'moment';

class DataSearchMutiNav extends PureComponent {
    constructor(props) {
        super(props)
        this.startRef = createRef();
        this.endRef = createRef();
        this.state = {
            secletBtn: '' || '농가선택',
            secsecletBtn: '' || '복수농가선택',
            sensorBtn: '' || '센서선택',
            startBtn: '' || '시작일',
            endBtn: '' || '종료일',
            tickBtn: '' || '조회주기',
            isModal: false,
            secletBtnValue: '',
            secsecletBtnValue: '',
            sensorBtnValue: '',
            tickBtnValue: '',
            label: '',
        }
    }

    toggle = () => {
        this.setState(({ isModal }) => ({
            isModal: !isModal,
        }))
    }

    resetBtn = () => {
        this.setState({
            secletBtn: '' || '농가선택',
            secsecletBtn: '' || '복수농가선택',
            sensorBtn: '' || '센서선택',
            startBtn: '' || '시작일',
            endBtn: '' || '종료일',
            tickBtn: '' || '조회주기',
        })
    }

    secletBtnChange = (item) => {
        console.log(item)
        if (item === 1) {
            return this.setState({
                secletBtn: '수직형',
                secletBtnValue: 1,
            })
        } else if (item === 2) {
            return this.setState({
                secletBtn: '생략형 A',
                secletBtnValue: 2,
            })
        } else if (item === 3) {
            return this.setState({
                secletBtn: '생략형 B',
                secletBtnValue: 3,
            })
        } else if (item === 4) {
            return this.setState({
                secletBtn: '전통형',
                secletBtnValue: 4,
            })
        }
    }

    secsecletBtnChange = (item) => {
        console.log(item)
        if (item === 1) {
            return this.setState({
                secsecletBtn: '수직형',
                secsecletBtnValue: 1,
            })
        } else if (item === 2) {
            return this.setState({
                secsecletBtn: '생략형 A',
                secsecletBtnValue: 2,
            })
        } else if (item === 3) {
            return this.setState({
                secsecletBtn: '생략형 B',
                secsecletBtnValue: 3,
            })
        } else if (item === 4) {
            return this.setState({
                secsecletBtn: '전통형',
                secsecletBtnValue: 4,
            })
        }
    }

    sensorBtnChange = (item) => {
        console.log(item)
        if (item === 1) {
            return this.setState({
                sensorBtn: '온도센서',
                sensorBtnValue: 'TEMP',
                label: '온도'
            })
        } else if (item === 2) {
            return this.setState({
                sensorBtn: '습도센서',
                sensorBtnValue: 'HUMID',
                label: '습도',
            })
        } else if (item === 3) {
            return this.setState({
                sensorBtn: 'Co2센서',
                sensorBtnValue: 'CO2',
                label: 'CO2'
            })
        }
    }

    tickBtnChange = (item) => {
        console.log(item)
        if (item === 1) {
            return this.setState({
                tickBtn: 'Times',
                tickBtnValue: 'hour',
            })
        } else if (item === 2) {
            return this.setState({
                tickBtn: 'Days',
                tickBtnValue: 'day',
            })
        } else if (item === 3) {
            alert('데이터가 충분하지 않습니다.')
            /* return this.setState({
                tickBtn: 'Weeks',
            }) */
        } else if (item === 4) {
            alert('데이터가 충분하지 않습니다.')
            /* return this.setState({
                tickBtn: 'Months',
            }) */
        }
    }

    btnEvent = () => {
        const { Post, FarmTextType } = this.props;
        const { secletBtn, secsecletBtn, sensorBtn, startBtn, endBtn, tickBtn } = this.state
        if (secletBtn === '농가선택') {
            return alert('농가선택란이 비어있습니다.')
        } else if (secsecletBtn === 'secsecletBtn') {
            return alert('농가선택란이 비어있습니다.')
        } else if (sensorBtn === '센서선택') {
            return alert('센서선택이 비어있습니다.')
        } else if (startBtn === '시작일') {
            return alert('시작일이 비어있습니다.')
        } else if (endBtn === '종료일') {
            return alert('종료일이 비어있습니다.')
        } else if (tickBtn === '조회주기') {
            return alert('조회주기가 비어있습니다.')
        } alert('조회성공')
        this.toggle();
        this.resetBtn();
        Post(
            this.state.secletBtnValue,
            this.state.secsecletBtnValue,
            this.state.startBtn,
            this.state.endBtn,
            this.state.sensorBtnValue,
            this.state.tickBtnValue,
        );
        FarmTextType(
            this.state.secletBtn,
            this.state.secsecletBtn,
            this.state.label,
            this.state.sensorBtnValue,
        );
    }

    startBtnChange = () => {
        this.setState({
            startBtn: moment(this.startRef.current.value).format('YYYYMMDD')
        })
    }

    endBtnChange = () => {
        this.setState({
            endBtn: moment(this.endRef.current.value).format('YYYYMMDD')
        })
    }

    secletBtnCreate = () => {
        return FARMBUTTON.map((item) => {
            return <DropdownItem key={item.key} onClick={() => this.secletBtnChange(item.value)}>{`${item.title}`}</DropdownItem>
        })
    }

    secsecletBtnCreate = () => {
        return FARMCOMPAREBUTTON.map((item) => {
            return <DropdownItem key={item.key} onClick={() => this.secsecletBtnChange(item.value)}>{`${item.title}`}</DropdownItem>
        })
    }

    sensorBtnCreate = () => {
        return SENSORBUTTON.map((item) => {
            return <DropdownItem key={item.key} onClick={() => this.sensorBtnChange(item.value)}>{item.name}</DropdownItem>
        })
    }

    tickBtnCreate = () => {
        return TICKBUTTON.map((item) => {
            return <DropdownItem key={item.key} onClick={() => this.tickBtnChange(item.value)}>{item.name}</DropdownItem>
        })
    }
    render() {
        const { secletBtn, secsecletBtn, sensorBtn, startBtn, endBtn, tickBtn } = this.state;
        return (
            <Button onClick={this.toggle}>조회
                <Modal isOpen={this.state.isModal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>조회</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <FormText>농장선택</FormText>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {secletBtn}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.secletBtnCreate()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>

                            <FormGroup>
                                <FormText>복수농장선택</FormText>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {secsecletBtn}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.secsecletBtnCreate()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>

                            <FormGroup>
                                <FormText>센서선택</FormText>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {sensorBtn}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.sensorBtnCreate()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>

                            <FormGroup>
                                <FormText>시작일</FormText>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {startBtn}
                                    </DropdownToggle>
                                    <DropdownMenu style={{ margin: 0, padding: 0, }}>
                                        <input type={'date'} onChange={this.startBtnChange} ref={this.startRef} />
                                        <DropdownItem>확인</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>

                            <FormGroup>
                                <FormText>종료일</FormText>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {endBtn}
                                    </DropdownToggle>
                                    <DropdownMenu style={{ margin: 0, padding: 0, }}>
                                        <input type={'date'} onChange={this.endBtnChange} ref={this.endRef} />
                                        <DropdownItem>확인</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>

                            <FormGroup>
                                <FormText>조회주기</FormText>
                                <UncontrolledDropdown>
                                    <DropdownToggle caret>
                                        {tickBtn}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.tickBtnCreate()}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </FormGroup>
                        </Form>

                    </ModalBody>
                    <ModalFooter>
                        <Button color={'primary'} onClick={this.btnEvent}>조회</Button>
                        <Button color={'secondary'} onClick={this.toggle}>취소</Button>
                    </ModalFooter>
                </Modal>
            </Button>
        );
    }
}

export default DataSearchMutiNav;