/*global Chart*/
import React, { Component } from 'react';
import { CardBody, Label, Row, Col } from 'reactstrap';
import styles from '../styles/Moter.module.css';
import { GAUGE } from '../data/GaugeData';
class Moter extends Component {
    constructor(gauge){
        super(gauge)
        this.gauge = gauge;
        this.state = {
          gaugeValue : GAUGE,
          value: 1,
        }
    }
    componentDidMount = () => {
        this.gaugeCreate1();
        this.gaugeCreate2();
        this.gaugeCreate3();
        this.gaugeCreate4();
    }

    gaugeCreate1 = () => {
        const ctx = document.getElementById(`gauge1${this.props.text}`)
        this.gauge = new Chart(ctx, this.state.gaugeValue)
        if (this.state.value === 0) {
          this.setState(prev => {
            let gaugeValue = Object.assign({}, prev.gaugeValue)
            gaugeValue.data.current = Math.round(0);
            gaugeValue.options.panel.scales = ['ON', '환풍기' ,'OFF']
            console.log( gaugeValue )
            return { gaugeValue }
          })
        } else if (this.state.value === 1) {
          this.setState(prev => {
            let gaugeValue = Object.assign({}, prev.gaugeValue)
            gaugeValue.data.current = Math.round(180);
            gaugeValue.options.panel.scales = ['ON', '에어컨' ,'OFF']
            console.log( gaugeValue )
            return { gaugeValue }
          })
        }
    }

    gaugeCreate2 = () => {
        const ctx = document.getElementById(`gauge2${this.props.text}`)
        this.gauge = new Chart(ctx, this.state.gaugeValue)
        if (this.state.value === 0) {
          this.setState(prev => {
            let gaugeValue = Object.assign({}, prev.gaugeValue)
            gaugeValue.data.current = Math.round(0);
            gaugeValue.options.panel.scales = ['ON', '환풍기' ,'OFF']
            console.log( gaugeValue )
            return { gaugeValue }
          })
        } else if (this.state.value === 1) {
          this.setState(prev => {
            let gaugeValue = Object.assign({}, prev.gaugeValue)
            gaugeValue.data.current = Math.round(180);
            gaugeValue.options.panel.scales = ['ON', '에어컨' ,'OFF']
            console.log( gaugeValue )
            return { gaugeValue }
          })
        }
    }

    gaugeCreate3 = () => {
        const ctx = document.getElementById(`gauge3${this.props.text}`)
        this.gauge = new Chart(ctx, this.state.gaugeValue)
        if (this.state.value === 0) {
          this.setState(prev => {
            let gaugeValue = Object.assign({}, prev.gaugeValue)
            gaugeValue.data.current = Math.round(0);
            gaugeValue.options.panel.scales = ['ON', '환풍기' ,'OFF']
            console.log( gaugeValue )
            return { gaugeValue }
          })
        } else if (this.state.value === 1) {
          this.setState(prev => {
            let gaugeValue = Object.assign({}, prev.gaugeValue)
            gaugeValue.data.current = Math.round(180);
            gaugeValue.options.panel.scales = ['ON', '에어컨' ,'OFF']
            console.log( gaugeValue )
            return { gaugeValue }
          })
        }
    }

    gaugeCreate4 = () => {
        const ctx = document.getElementById(`gauge4${this.props.text}`)
        this.gauge = new Chart(ctx, this.state.gaugeValue)
        if (this.state.value === 0) {
          this.setState(prev => {
            let gaugeValue = Object.assign({}, prev.gaugeValue)
            gaugeValue.data.current = Math.round(0);
            gaugeValue.options.panel.scales = ['ON', '환풍기' ,'OFF']
            console.log( gaugeValue )
            return { gaugeValue }
          })
        } else if (this.state.value === 1) {
          this.setState(prev => {
            let gaugeValue = Object.assign({}, prev.gaugeValue)
            gaugeValue.data.current = Math.round(180);
            gaugeValue.options.panel.scales = ['ON', '에어컨' ,'OFF']
            console.log( gaugeValue )
            return { gaugeValue }
          })
        }
    }

    render() {
        console.log('Moter')
        return (
            <CardBody className={styles.container}>
                <Label style={{ position: 'absolute', top: '2%', color: '#fdfdfd', fontWeight: 'bold', fontSize: '1.4rem' }}>농장 1번</Label>
                <Row className={styles.row}>
                    <Col md={6}>
                    <canvas id={`gauge1${this.props.text}`}/>
                    </Col>

                    <Col md={6}>
                    <canvas id={`gauge2${this.props.text}`}/>
                    </Col>
                </Row>

                <Row className={styles.row}>
                    <Col md={6}>
                    <canvas id={`gauge3${this.props.text}`}/>
                    </Col>
                    
                    <Col md={6}>
                    <canvas id={`gauge4${this.props.text}`}/>
                    </Col>
                </Row>
            </CardBody>
        );
    }
}

export default Moter;