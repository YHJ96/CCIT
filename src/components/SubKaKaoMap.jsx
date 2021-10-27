/*global kakao*/
import React, { Component } from 'react';
import { CardBody, Row, Col, CardText, Label } from 'reactstrap';

class SubKaKaoMap extends Component {
    constructor(map){
        super(map)
        this.map = map
        this.lat = this.props.lat
        this.lng = this.props.lng
        this.title = this.props.title
    }
    componentDidMount () {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(this.lat, this.lng),
            level: 2
        }
        this.map = new kakao.maps.Map(container, options);
        const marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(this.lat, this.lng),
            clickable: true,
        });
        const infowindow = new kakao.maps.InfoWindow({
            content: this.title
        });
        kakao.maps.event.addListener(
            marker,
            "mouseover",
            this.makeOverListener(this.map, marker, infowindow)
        );
        kakao.maps.event.addListener(
            marker,
            "mouseout",
            this.makeOutListener(infowindow)
        );
    }
    makeOverListener = (map, marker, infowindow) => {
        return () => {
            infowindow.open(map, marker);
        };
    };
    makeOutListener = (infowindow) => {
        return () => {
            infowindow.close();
        }
    };
    render() {
        return (
            <CardBody style={{ width: '100%', height: '100%' }}>
                <Row>
                    <Label tag={'h4'} style={{ margin: 0, padding: 0, fontWeight: 'bold', color: '#fdfdfd', marginLeft: '1%'}} >농장 위치</Label>
                </Row>
                <Row style={{ height: '90%', marginTop: '1%' }}>
                    <Col>
                    <CardText tag={'div'} id={'map'} style={{ width: '100%', height: '100%' }}/>
                    </Col>
                </Row>
            </CardBody>
        );
    }
}

export default SubKaKaoMap;