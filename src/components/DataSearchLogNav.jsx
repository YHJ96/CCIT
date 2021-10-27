import React, { PureComponent, createRef } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormText } from 'reactstrap';
import { FARMBUTTON, TICKBUTTON } from '../data/DataSearchLog';

class DataSearchLogNav extends PureComponent {
    constructor(props){
        super(props)
        this.startRef = createRef();
        this.endRef = createRef();
        this.state = {
            secletBtn: '' || '농가선택',
            startBtn: '' || '시작일',
            endBtn: '' || '종료일',
            tickBtn: '' || '조회주기',
            isModal: false,
        }
    }

    toggle = () => {
        this.setState(({isModal})=>({
          isModal: !isModal,
        }))
      }
    
    resetBtn = () => {
        this.setState({
            secletBtn: '' || '농가선택',
            startBtn: '' || '시작일',
            endBtn: '' || '종료일',
            tickBtn: '' || '조회주기',
        })
    }

    secletBtnChange = (item) => {
        console.log(item)
        if (item === 1) {
            return this.setState({
                secletBtn: '농가 1번',
            })
        } else if (item === 2) {
            return this.setState({
                secletBtn: '농가 2번',
            })
        } else if (item === 3) {
            return this.setState({
                secletBtn: '농가 3번'
            })
        } else if (item === 4) {
            return this.setState({
                secletBtn: '농가 4번'
            })
        }
    }

    tickBtnChange = (item) => {
        console.log(item)
        if (item === 1) {
            return this.setState({
                tickBtn: 'Times'
            })
        } else if (item === 2) {
            return this.setState({
                tickBtn: 'Days'
            })
        } else if (item === 3) {
            return this.setState({
                tickBtn: 'Weeks'
            })
        } else if (item === 4) {
            return this.setState({
                tickBtn: 'Months'
            })
        }
    }

    btnEvent = () => {
        const { secletBtn, startBtn, endBtn, tickBtn } = this.state
        if (secletBtn === '농가선택' ) {
           return alert('농가선택란이 비어있습니다.')
        } else if (startBtn === '시작일') {
           return alert('시작일이 비어있습니다.')
        } else if (endBtn === '종료일') {
           return alert('종료일이 비어있습니다.')
        } else if (tickBtn === '조회주기') {
           return alert('조회주기가 비어있습니다.')
        } alert('조회성공')
        this.toggle();
        this.resetBtn();
    }

    startBtnChange = () => {
        this.setState({
            startBtn: this.startRef.current.value
        })
    }

    endBtnChange = () => {
        this.setState({
            endBtn: this.endRef.current.value
        })
    }

    secletBtnCreate = () => {
        return FARMBUTTON.map((item)=>{
            return <DropdownItem key={item.key} onClick={()=>this.secletBtnChange(item.value)}>{`농가 ${item.value}번`}</DropdownItem>
        })
    }

    tickBtnCreate = () => {
        return TICKBUTTON.map((item)=>{
            return <DropdownItem key={item.key} onClick={()=>this.tickBtnChange(item.value)}>{item.name}</DropdownItem>
        })
    }
    render() {
        const { secletBtn, startBtn, endBtn, tickBtn } = this.state;
        return (
            <Button onClick={this.toggle}>조회
            <Modal isOpen={this.state.isModal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>회원가입</ModalHeader>
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
                        <FormText>시작일</FormText>
                            <UncontrolledDropdown>
                            <DropdownToggle caret>
                                {startBtn}
                            </DropdownToggle>
                            <DropdownMenu style={{ margin: 0, padding: 0,}}>
                                <input type={'date'} onChange={this.startBtnChange} ref={this.startRef}/>
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
                            <DropdownMenu style={{ margin: 0, padding: 0,}}>
                                <input type={'date'} onChange={this.endBtnChange} ref={this.endRef}/>
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

export default DataSearchLogNav;