import React, { Component } from 'react';
import {     
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Form, 
    FormGroup, 
    FormText, 
    Input ,
 } from 'reactstrap';
 import Axios from 'axios';
import { DataCry } from '../data/DataCry';
import { SHA256 } from '../data/HashPassWord';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class ChangePW extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props)
        this.pw = React.createRef();
        this.pwcheck = React.createRef();
        this.state = {
            modal: false,
        }
    }
    componentDidMount() {
        this.toggle()
    }

    toggle = () => {
        this.setState(({modal})=>({
            modal: !modal
        }))
    }

    goLogin = () => {
        const { history } = this.props;
        history.push('/')
    }

    postNewPW = async() => {
        const { cookies } = this.props;
        if ( this.pw.current.value.length === 0
            || this.pwcheck.current.value.length === 0
            ) {
            return alert('필요한 정보를 모두 입력해주십시오.')
            } else if (!/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/.test(this.pw.current.value)) {
                return alert('비밀번호는 10자 이상이어야 하며, 숫자/소문자/특수문자를 모두 포함해야 합니다.')
            } else if (this.pw.current.value !== this.pwcheck.current.value) {
                return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
            }
        const days = Date.now().toString();
        const url = "http://192.168.0.1/pw/change";
        console.log(cookies.get('userid'),cookies.get('useremail'),cookies.get('usertoken'))
        console.log(SHA256(this.pw.current.value))
        await Axios.post(url,{
            user_id : cookies.get('userid'),
            user_pw : SHA256(this.pw.current.value),
            user_email : cookies.get('useremail'),
            token : cookies.get('usertoken'),
        }, {
            headers: {
                'x-date': days,
                'x-accesskey': 'GSSIOT',
                'x-signature': DataCry(url, days),
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.goLogin();
        })
    }
    render() {
        return (
            <div>
                <Button onClick={this.goLogin}>로그인페이지로 돌아가기</Button> {' '}
                <Button onClick={this.toggle}>비밀번호변경창</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>비밀번호변경</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormText>비밀번호</FormText>
                            <Input innerRef={this.pw} type={'password'}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText>비밀번호확인</FormText>
                            <Input innerRef={this.pwcheck} type={'password'}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color={'primary'} onClick={this.postNewPW}>비밀번호변경하기</Button>
                    <Button color={'secondary'} onClick={this.toggle}>취소</Button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export default withCookies(ChangePW);