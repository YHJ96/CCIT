import React, { PureComponent } from 'react';
import { Card, CardBody, CardText, ListGroup, ListGroupItem } from 'reactstrap';
import TasksMedia from './TasksMedia';
import styles from '../Update.module.css';
import { farmdata } from '../../data/FarmData';

class TimeLine extends PureComponent {
    createLog = () => {
        return farmdata.map((item, index) => {
            return  <ListGroupItem key={index} action id={styles.soild}>
            <TasksMedia iconColor="danger" title={item.title} farmkey={item.farmkey}/>
            </ListGroupItem>
        }) 
    }
    render() {
        return (
            <Card id={styles.scroll} style={{ height: '93%', overflow: 'scroll', marginTop: '3%', marginBottom: '4%', background: '#2F3237', color: '#fdfdfd' }}>
                <CardText style={{ fontSize: 18, marginTop: '5px', marginLeft: '5px' }}>
                    {'로그알림'}
                </CardText>
            <CardBody style={{ padding: 0 }}>
            <ListGroup flush>
                {this.createLog()}
            </ListGroup>
            </CardBody>
            </Card>
        );
    }
}

export default TimeLine;