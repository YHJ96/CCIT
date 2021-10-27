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
    Input 
} from 'reactstrap';
import { SHA256 } from '../data/HashPassWord'
import Axios from 'axios';
import { DataCry } from '../data/DataCry'

class Resgister extends PureComponent {
    constructor(props){
        super(props)
        this.id = createRef();
        this.pw = createRef();
        this.pwcheck = createRef();
        this.name = createRef();
        this.email = createRef();
        this.phone = createRef();
    }
    
    postResgister = async() => {
        if (this.id.current.value.length === 0 
            || this.pw.current.value.length === 0
            || this.name.current.value.length === 0
            || this.email.current.value.length === 0
            || this.phone.current.value.length === 0
            ) {
            return alert('필요한 정보를 모두 입력해주십시오.')
        } else if(!/^[0-9a-z]+$/.test(this.id.current.value)) {
            return alert('아이디 형식은 숫자, 영문만 입력 가능합니다.')
        } else if (!/^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/.test(this.pw.current.value)) {
           return alert('비밀번호는 10자 이상이어야 하며, 숫자/소문자/특수문자를 모두 포함해야 합니다.')
        } else if (this.pw.current.value !== this.pwcheck.current.value) {
           return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
        } else if (!/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/.test(this.email.current.value)) {
           return alert('이메일 형식을 확인해주세요.')
        } else if (!/(\d{3})-.*(\d{3})-.*(\d{4})/.test(this.phone.current.value)) {
            return alert('전화번호 형식을 확인해주세요. 예, 123-123-2344 혹은 123-1234-1234')
        }
        const days = Date.now().toString();
        const url = "http://192.168.0.1/join";
        await Axios.post('http://192.168.0.1/join',{
            user_id : this.id.current.value,
            user_pw : SHA256(this.pw.current.value),
            user_name : this.name.current.value,
            user_email : this.email.current.value,
            user_phone : this.phone.current.value,
        }, {
            headers: {
                'x-date': days,
                'x-accesskey': 'GSSIOT',
                'x-signature': DataCry(url, days),
            }
        })
        .then((res)=>{
            const { toggle } = this.props;
            console.log(res.data, res.status);
            if (res.data.statusCode === 400) {
                alert('회원가입이 완료되었습니다.')
                return toggle();
            } else if(res.data.statusCode === 401) {
               return alert('아이디가 사용중입니다.')
            } else if (res.data.statusCode === 402) {
               return alert('비밀번호 암호화에 실패하였습니다. GSSIOT에 문의해주세요')
            } 
        })
    }

    render() {
        const { isModal, toggle } = this.props;
        return (
            <Modal isOpen={isModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>회원가입</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormText>아이디</FormText>
                            <Input innerRef={this.id}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText>비밀번호</FormText>
                            <Input innerRef={this.pw} type={'password'}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText>비밀번호 확인</FormText>
                            <Input innerRef={this.pwcheck} type={'password'}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText>이름</FormText>
                            <Input innerRef={this.name}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText>이메일</FormText>
                            <Input innerRef={this.email}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText>전화번호</FormText>
                            <Input innerRef={this.phone}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color={'primary'} onClick={this.postResgister}>회원가입</Button>
                    <Button color={'secondary'} onClick={toggle}>취소</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Resgister;