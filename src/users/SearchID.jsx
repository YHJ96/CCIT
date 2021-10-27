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
} from 'reactstrap';
import Axios from 'axios';
import { DataCry } from '../data/DataCry';

class SearchID extends PureComponent {
    constructor(props){
        super(props)
        this.name = createRef();
        this.phone = createRef();
        this.state = {
            isOpen : false,
        }
    }

    searchToggle = () => {
        this.setState(({isOpen})=>({
            isOpen: !isOpen
        }))
    }

    postIDcheck = async() => {
        const { toggle } = this.props;
        if ( this.name.current.value.length === 0
            || this.phone.current.value.length === 0
            ) {
            return alert('필요한 정보를 모두 입력해주십시오.')
            } else if (!/(\d{3})-.*(\d{3})-.*(\d{4})/.test(this.phone.current.value)) {
           return alert('전화번호 형식을 확인해주세요. 예, 123-123-2344 혹은 123-1234-1234')
        }
        const days = Date.now().toString();
        const url = "http://192.168.0.1/id/find";
        console.log(this.name.current.value, this.phone.current.value)
        await Axios.post(url,{
            user_name : this.name.current.value,
            user_phone : this.phone.current.value,
        }, {
            headers: {
                'x-date': days,
                'x-accesskey': 'GSSIOT',
                'x-signature': DataCry(url, days),
            }
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.statusCode === 100) {
                alert(`귀하의 아이디는 ${res.data.payload[0].USER_ID} 입니다.`)
            }
            toggle()
        })
    }

    render() {
        const { isModal, toggle } = this.props;
        return (
            <Modal isOpen={isModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>아이디찾기</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <FormText>이름</FormText>
                            <Input innerRef={this.name}/>
                        </FormGroup>
                        <FormGroup>
                            <FormText>전화번호</FormText>
                            <Input innerRef={this.phone}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color={'primary'} onClick={this.postIDcheck}>아이디찾기</Button>
                    <Button color={'secondary'} onClick={toggle}>취소</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default SearchID;