import React, { PureComponent } from 'react';
import { Container, Row, Col, Card, Form } from 'reactstrap';
import styles from '../styles/DataSearchMulti.module.css';
import DataSearchLogNav from './DataSearchLogNav';

class DataSearchMulti extends PureComponent {
    render() {
        return (
            <Container fluid>
                <Form className={styles.form}>
                    <DataSearchLogNav/>
                </Form>
                <Row>
                    <Col className={styles.col}>
                    <Card className={styles.card}>
                    </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DataSearchMulti;