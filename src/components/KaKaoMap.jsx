/*global kakao*/
import React, { PureComponent } from 'react';
import { mapdata } from '../data/MapData';
// import { Button, Collapse, Card, CardBody, CardTitle, CardText } from 'reactstrap';
class KaKaoMap extends PureComponent {
    constructor(map) {
        super(map)
        this.map = map
        this.state = {
            isOpen : false,
        }
    }

    componentDidMount() {
        this.kakaoMaps()
    }

    kakaoMaps = () => {
        const container = document.getElementById('myMap');
        const options = { 
            center: new kakao.maps.LatLng(37.658033551789295, 126.87193554286762), 
            level: 4
        };
        this.map = new kakao.maps.Map(container, options);
        this.map.setMapTypeId(kakao.maps.MapTypeId.SKYVIEW);

        mapdata.forEach((value) => {
            const marker = new kakao.maps.Marker({
                map: this.map,
                position: new kakao.maps.LatLng(value.lat, value.lng),
                clickable: true,
            });
            const infowindow = new kakao.maps.InfoWindow({
                content: value.title
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
        });
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

    toggle = () => {
        this.setState(({isOpen})=>({
            isOpen: !isOpen,
        }))
    }

    render() {
        console.log('KaKaoMap')
        return (
            <div id='myMap' style={{width: '100%', height: '100%'}}>
                <div style={{ zIndex: 9999, position: 'absolute', top: 0, right: 0,}}>
                </div>
            </div>
        );
    }
}

/*
                    <Button color={'dark'} onClick={this.toggle}>농장간략상태</Button>
                    <Collapse isOpen={this.state.isOpen} style={{ marginTop: '10px' }}>
                        <Card>
                            <CardBody>
                                <CardTitle>프로방스</CardTitle>
                                <CardText>내용</CardText>
                            </CardBody>
                        </Card>
                    </Collapse>
                    <Collapse isOpen={this.state.isOpen} style={{ marginTop: '10px' }}>
                        <Card>
                            <CardBody>
                                <CardTitle>예림</CardTitle>
                                <CardText>내용</CardText>
                            </CardBody>
                        </Card>
                    </Collapse>
*/

export default KaKaoMap;