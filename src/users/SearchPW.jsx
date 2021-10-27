import React, { PureComponent, createRef } from 'react';
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
    Collapse,
    Card,
    CardBody,
} from 'reactstrap';
import Axios from 'axios';
import { DataCry } from '../data/DataCry';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class SearchPW extends PureComponent {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props)
        this.id = createRef();
        this.email = createRef();
        this.emailToken = createRef();
        this.state = {
            isOpen : false,
        }
    }

    searchToggle = () => {
        this.setState(({isOpen})=>({
            isOpen: !isOpen
        }))
    }

    postID = async() => {
        if ( this.id.current.value.length === 0
            || this.email.current.value.length === 0
            ) {
            return alert('필요한 정보를 모두 입력해주십시오.')
            } else if (!/^[0-9a-z]+$/.test(this.id.current.value)) {
                return alert('아이디 형식은 숫자, 영문만 입력 가능합니다.')
            } else if (!/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(this.email.current.value)) {
           return alert('이메일 형식을 확인해주세요.')
        } 
        const days = Date.now().toString();
        const url = "http://192.168.0.1/pw/emailtoken";
        console.log(this.id.current.value, this.email.current.value)
        await Axios.post(url,{
            user_id : this.id.current.value,
            user_email : this.email.current.value,
        }, {
            headers: {
                'x-date': days,
                'x-accesskey': 'GSSIOT',
                'x-signature': DataCry(url, days),
            }
        })
        .then((res)=>{
            console.log(res.data)
            this.searchToggle();
        })
    }

    postPWcheck = async() => {
        const { history } = this.props;
        const { cookies } = this.props;
        console.log(history)
        if ( this.id.current.value.length === 0
            || this.email.current.value.length === 0
            ) {
            return alert('필요한 정보를 모두 입력해주십시오.')
            } else if(!/^[0-9a-z]+$/.test(this.id.current.value)) {
            return alert('아이디 형식은 숫자, 영문만 입력 가능합니다')
            } else if (!/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(this.email.current.value)) {
           return alert('이메일 형식을 확인해주세요.') 
        }  else if (this.emailToken.current.value.length === 0) {
            return alert('인증하기 버튼을 눌러주세요.')
        } 
        const days = Date.now().toString();
        const url = "http://192.168.0.1/pw/emailauth";
        cookies.set('userid', this.id.current.value, { path: '/' })
        cookies.set('useremail', this.email.current.value, { path: '/' })
        cookies.set('usertoken', this.emailToken.current.value, { path: '/' })
        await Axios.post(url,{
            user_id : this.id.current.value,
            user_email : this.email.current.value,
            token: this.emailToken.current.value,
        }, {
            headers: {
                'x-date': days,
                'x-accesskey': 'GSSIOT',
                'x-signature': DataCry(url, days),
            }
        })
        .then((res)=>{
            console.log(res.data)
            history.push('/changepw')
        })
    }

    render() {
        const { isModal, toggle } = this.props;
        return (
            <Modal isOpen={isModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>비밀번호찾기</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormText>아이디</FormText>
                            <Input innerRef={this.id}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText>이메일</FormText>
                            <Input innerRef={this.email}/>
                        </FormGroup>
                        <FormGroup style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={this.postID}>인증하기</Button>
                        </FormGroup>
                        <Collapse isOpen={this.state.isOpen}>
                                <Card>
                                    <CardBody>
                                        <FormText>이메일 인증코드 입력</FormText>
                                        <Input innerRef={this.emailToken}/>
                                    </CardBody>
                                </Card>
                            </Collapse>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color={'primary'} onClick={this.postPWcheck}>비밀번호찾기</Button>
                    <Button color={'secondary'} onClick={toggle}>취소</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default withCookies(SearchPW);