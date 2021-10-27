import React, { Component } from 'react';
import { Container, Col, Form, Table, FormText, Button } from 'reactstrap';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class SettingLog extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props)
        this.farmTempMin1 = React.createRef();
        this.farmTempMax1 = React.createRef();
        this.farmHumMin1 = React.createRef();
        this.farmHumMax1 = React.createRef();
        this.farmCo2Min1 = React.createRef();
        this.farmCo2Max1 = React.createRef();

        this.farmTempMin2 = React.createRef();
        this.farmTempMax2 = React.createRef();
        this.farmHumMin2 = React.createRef();
        this.farmHumMax2 = React.createRef();
        this.farmCo2Min2 = React.createRef();
        this.farmCo2Max2 = React.createRef();

        this.farmTempMin3 = React.createRef();
        this.farmTempMax3 = React.createRef();
        this.farmHumMin3 = React.createRef();
        this.farmHumMax3 = React.createRef();
        this.farmCo2Min3 = React.createRef();
        this.farmCo2Max3 = React.createRef();

        this.farmTempMin4 = React.createRef();
        this.farmTempMax4 = React.createRef();
        this.farmHumMin4 = React.createRef();
        this.farmHumMax4 = React.createRef();
        this.farmCo2Min4 = React.createRef();
        this.farmCo2Max4 = React.createRef();

        this.state = {
            farmTempMin1: '',
            farmTempMax1: '',
            farmHumMin1: '',
            farmHumMax1: '',
            farmCo2Min1: '',
            farmCo2Max1: '',
            farmTempMin2: '',
            farmTempMax2: '',
            farmHumMin2: '',
            farmHumMax2: '',
            farmCo2Min2: '',
            farmCo2Max2: '',
            farmTempMin3: '',
            farmTempMax3: '',
            farmHumMin3: '',
            farmHumMax3: '',
            farmCo2Min3: '',
            farmCo2Max3: '',
            farmTempMin4: '',
            farmTempMax4: '',
            farmHumMin4: '',
            farmHumMax4: '',
            farmCo2Min4: '',
            farmCo2Max4: '',
        }
    }

    postLog1 = () => {
        const { cookies } = this.props;
        this.setState({
            farmTempMin1: this.farmTempMin1.current.value,
            farmTempMax1: this.farmTempMax1.current.value,
            farmHumMin1: this.farmHumMin1.current.value,
            farmHumMax1: this.farmHumMax1.current.value,
            farmCo2Min1: this.farmCo2Min1.current.value,
            farmCo2Max1: this.farmCo2Max1.current.value,
        },() => {
            console.log(this.state.farmTempMin1)
            cookies.set('1ftmin', this.state.farmTempMin1, { path: '/' })
            cookies.set('1ftmax', this.state.farmTempMax1, { path: '/' })
            cookies.set('1fhmin', this.state.farmHumMin1, { path: '/' })
            cookies.set('1fhmax', this.state.farmHumMax1, { path: '/' })
            cookies.set('1fcmin', this.state.farmCo2Min1, { path: '/' })
            cookies.set('1fcmax', this.state.farmCo2Max1, { path: '/' })
        })
    }

    postLog2 = () => {
        const { cookies } = this.props;
        this.setState({
            farmTempMin2: this.farmTempMin2.current.value,
            farmTempMax2: this.farmTempMax2.current.value,
            farmHumMin2: this.farmHumMin2.current.value,
            farmHumMax2: this.farmHumMax2.current.value,
            farmCo2Min2: this.farmCo2Min2.current.value,
            farmCo2Max2: this.farmCo2Max2.current.value,
        },()=>{
            cookies.set('2ftmin', this.state.farmTempMin2, { path: '/' })
            cookies.set('2ftmax', this.state.farmTempMax2, { path: '/' })
            cookies.set('2fhmin', this.state.farmHumMin2, { path: '/' })
            cookies.set('2fhmax', this.state.farmHumMax2, { path: '/' })
            cookies.set('2fcmin', this.state.farmCo2Min2, { path: '/' })
            cookies.set('2fcmax', this.state.farmCo2Max2, { path: '/' })
        })
    }

    postLog3 = () => {
        const { cookies } = this.props;
        this.setState({
            farmTempMin3: this.farmTempMin3.current.value,
            farmTempMax3: this.farmTempMax3.current.value,
            farmHumMin3: this.farmHumMin3.current.value,
            farmHumMax3: this.farmHumMax3.current.value,
            farmCo2Min3: this.farmCo2Min3.current.value,
            farmCo2Max3: this.farmCo2Max3.current.value,
        },()=>{
            cookies.set('3ftmin', this.state.farmTempMin3, { path: '/' })
            cookies.set('3ftmax', this.state.farmTempMax3, { path: '/' })
            cookies.set('3fhmin', this.state.farmHumMin3, { path: '/' })
            cookies.set('3fhmax', this.state.farmHumMax3, { path: '/' })
            cookies.set('3fcmin', this.state.farmCo2Min3, { path: '/' })
            cookies.set('3fcmax', this.state.farmCo2Max3, { path: '/' })
        })
    }

    postLog4 = () => {
        const { cookies } = this.props;
        this.setState({
            farmTempMin4: this.farmTempMin4.current.value,
            farmTempMax4: this.farmTempMax4.current.value,
            farmHumMin4: this.farmHumMin4.current.value,
            farmHumMax4: this.farmHumMax4.current.value,
            farmCo2Min4: this.farmCo2Min4.current.value,
            farmCo2Max4: this.farmCo2Max4.current.value,
        },()=>{
            cookies.set('4ftmin', this.state.farmTempMin4, { path: '/' })
            cookies.set('4ftmax', this.state.farmTempMax4, { path: '/' })
            cookies.set('4fhmin', this.state.farmHumMin4, { path: '/' })
            cookies.set('4fhmax', this.state.farmHumMax4, { path: '/' })
            cookies.set('4fcmin', this.state.farmCo2Min4, { path: '/' })
            cookies.set('4fcmax', this.state.farmCo2Max4, { path: '/' })
        })
    }

    render() {
        return (
            <Container fluid>
                <Col md={12} style={{ height: '25vh' }}>
                    <Form >
                        <FormText color={''} style={{ fontSize: 20, fontWeight: 'bold', color: '#fdfdfd' }}>수직형</FormText>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>센서종류</th>
                                    <th>최소값</th>
                                    <th>최대값</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>온도</td>
                                    <td><input ref={this.farmTempMin1} /></td>
                                    <td><input ref={this.farmTempMax1} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>습도</td>
                                    <td><input ref={this.farmHumMin1} /></td>
                                    <td><input ref={this.farmHumMax1} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>CO2</td>
                                    <td><input ref={this.farmCo2Min1} /></td>
                                    <td><input ref={this.farmCo2Max1} /></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button onClick={this.postLog1}>전송</Button>
                    </Form>
                </Col>
                <Col md={12} style={{ height: '25vh', }}>
                    <Form >
                        <FormText color={''} style={{ fontSize: 20, fontWeight: 'bold', color: '#fdfdfd' }}>생력형 A</FormText>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>센서종류</th>
                                    <th>최소값</th>
                                    <th>최대값</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>온도</td>
                                    <td><input ref={this.farmTempMin2} /></td>
                                    <td><input ref={this.farmTempMax2} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>습도</td>
                                    <td><input ref={this.farmHumMin2} /></td>
                                    <td><input ref={this.farmHumMax2} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>CO2</td>
                                    <td><input ref={this.farmCo2Min2} /></td>
                                    <td><input ref={this.farmCo2Max2} /></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button onClick={this.postLog2}>전송</Button>
                    </Form>
                </Col>
                <Col md={12} style={{ height: '25vh' }}>
                    <Form >
                        <FormText color={''} style={{ fontSize: 20, fontWeight: 'bold', color: '#fdfdfd' }}>생력형 B</FormText>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>센서종류</th>
                                    <th>최소값</th>
                                    <th>최대값</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>온도</td>
                                    <td><input ref={this.farmTempMin3} /></td>
                                    <td><input ref={this.farmTempMax3} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>습도</td>
                                    <td><input ref={this.farmHumMin3} /></td>
                                    <td><input ref={this.farmHumMax3} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>CO2</td>
                                    <td><input ref={this.farmCo2Min3} /></td>
                                    <td><input ref={this.farmCo2Max3} /></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button onClick={this.postLog3}>전송</Button>
                    </Form>
                </Col>
                <Col md={12} style={{ height: '25vh' }}>
                    <Form >
                        <FormText color={''} style={{ fontSize: 20, fontWeight: 'bold', color: '#fdfdfd' }}>전통형</FormText>
                        <Table size={'sm'} dark>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>센서종류</th>
                                    <th>최소값</th>
                                    <th>최대값</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>온도</td>
                                    <td><input ref={this.farmTempMin4} /></td>
                                    <td><input ref={this.farmTempMax4} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>습도</td>
                                    <td><input ref={this.farmHumMin4} /></td>
                                    <td><input ref={this.farmHumMax4} /></td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>CO2</td>
                                    <td><input ref={this.farmCo2Min4} /></td>
                                    <td><input ref={this.farmCo2Max4} /></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button onClick={this.postLog4}>전송</Button>
                    </Form>
                </Col>
            </Container>
        );
    }
}

export default withCookies(SettingLog);