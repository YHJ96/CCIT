import React, { PureComponent } from 'react';
import { Card, CardBody } from 'reactstrap';
import styles from './Clock.module.css';
import LiveClock from 'react-live-clock';

class Clock extends PureComponent {
    render() {
        return (
            <Card className={styles.container} style={{ height: '98%', marginTop: '2%' }}>
                <CardBody id={styles.clock}>
                    <LiveClock className={styles.date} format={'YYYY년 MM월 DD일'} ticking={true}/> <br/>
                    <LiveClock className={styles.time} format={'HH:mm:ss'} ticking={true}/>
                </CardBody>
            </Card>
        );
    }
}

export default Clock;