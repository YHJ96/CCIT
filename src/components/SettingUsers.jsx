import React, { Component } from 'react';
import { Container, Col, Form, Table, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter, ButtonDropdown, DropdownToggle, DropdownMenu ,DropdownItem } from 'reactstrap';
import Checkbox from '../data/CheckBox';
import Axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { DataCry } from '../data/DataCry'

class SettingUsers extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.state = {
            usersValue: [],
            isModal: false,
            isOpen: false,
            btnValue: '권한선택',
            bthData: '',
            refresh: false,
        }
    }

    componentDidMount = () => {
        this.selectedCheckboxes = new Set();
        this.getUsersdata();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.refresh !== prevState.refresh) {
            this.getUsersdata();
            console.log(`${this.state.refresh} ${prevState.refresh}`);
        }
    }

    btnToggle = () => {
        this.setState(({isOpen})=>({
            isOpen: !isOpen,
        }))
    }

    toggle = () => {
        this.setState(({isModal})=>({
            isModal: !isModal,
        }))
    }

    onClickAdmin = () => {
        this.setState({
            btnValue: 'Admin',
            btnData: 'admin',
        })
    }

    onClickUser = () => {
        this.setState({
            btnValue: 'User',
            btnData: 'user',
        })
    }

    getUsersdata = () => {
        const { cookies } = this.props;
        const days = Date.now().toString();
        const url = "http://192.168.0.1/api/user";
        Axios.post(url,
            {},
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
                this.setState({
                    usersValue: res.data.payload,
                    refresh: false,
                })
            })
            .catch((err) => {
                alert(err)
            })
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();
        this.selectedCheckboxes.forEach((item)=>{
            const { cookies } = this.props;
            const days = Date.now().toString();
            const url = "http://192.168.0.1/api/user/promote";
            Axios.post(url,
                {
                    user_id : item
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
                    this.toggle();
                })
                .catch((err) => {
                    alert(err)
                })
        })
    }

    createTable = () => {
        return this.state.usersValue.map((item, index)=>{
            return <tr key={index}>
            <th scope={'row'}>
                <Checkbox 
                toggleCheckbox={() => {this.toggleCheckbox(item.USER_ID)}}/>
            </th>
            <td>{item.USER_ID}</td>
            <td>{item.USER_NAME}</td>
            <td>{item.USER_AUTHORITY}</td>
        </tr>
        })
    } 
    render() {
        return (
            <Container fluid>
                <Col md={12} style={{ height: '100vh' }}>
                    <Form >
                        <FormText>회원정보</FormText>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>아이디</th>
                                    <th>이름</th>
                                    <th>권한</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTable()}
                            </tbody>
                        </Table>
                        <Button onClick={this.toggle}>수정</Button>
                        <Modal isOpen={this.state.isModal} toggle={this.toggle}>
                            <ModalHeader>회원권한 상승</ModalHeader>
                            <ModalBody>
                                <ButtonDropdown isOpen={this.state.isOpen} toggle={this.btnToggle}>
                                    <DropdownToggle caret size={'lg'}>{this.state.btnValue}</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={this.onClickAdmin}>Admin</DropdownItem>
                                        <DropdownItem onClick={this.onClickUser}>User</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                            </ModalBody>
                            <ModalFooter>
                                <Button color={'primary'} onClick={this.handleFormSubmit}>확인</Button>
                                <Button onClick={this.toggle}>취소</Button>
                            </ModalFooter>
                        </Modal>
                    </Form>
                </Col>
            </Container>
        );
    }
}

export default withCookies(SettingUsers);