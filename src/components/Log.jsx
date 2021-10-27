import React, { PureComponent } from 'react';
import { UncontrolledAlert, CardTitle, CardText, CardBody, Label} from 'reactstrap';
import * as Icon from 'react-bootstrap-icons';
import styles from '../styles/Log.module.css';
import LogAlert from '../data/LogAlert';
import { farmdata } from '../data/FarmData';

class Log extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            isLoding: false,
        }
    }
    createLog = () => {
        return farmdata.map((item)=>{
            return <LogAlert key={item.key} title={item.title} farmkey={item.farmkey}/>
        })
    }
    createSys = () => {
        return <UncontrolledAlert color={''} style={{background: '#555659'}}>
        <CardTitle style={{ height: '100%', display: 'flex', alignItems: 'center', color: '#53b8ea' }}>
        <Icon.RecordCircleFill style={{ marginRight: '1%' }}/>
        시스템</CardTitle>
        <CardText style={{ color: '#fdfdfd' }}>이상 데이터가 없습니다.</CardText>
    </UncontrolledAlert>
    }
    render() {
        return (
            <CardBody className={styles.container} style={{ overflowY: 'scroll'}}>
                <Label tag={'h4'} style={{ color: '#fdfdfd', fontWeight: 'bold', marginBottom: '2%' }}>알림 서비스</Label>
                {this.createLog()}
            </CardBody>
        );
    }
}

export default Log;