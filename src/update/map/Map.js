/*global kakao*/
import React, { PureComponent } from 'react';
import { Card, CardBody } from 'reactstrap';
import { mapdata } from '../../data/MapData';

class Map extends PureComponent {
    constructor(props){
        super(props)
        this.map = props;
    }

    componentDidMount () {
        this.kakaoMap();
    }

    kakaoMap = () => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.658193551789295, 126.87199554286710), 
            level: 3,
        }
        this.map = new kakao.maps.Map(container, options);

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

    render() {
        return (
            <Card style={{ height: '94%', marginTop: '3%', marginBottom: '3%', backgroundColor: '#2f3237' }}>
                <CardBody style={{ margin: 0, padding: 0 }}>
                    <div id={'map'} style={{ width: '100%', height: '100%' }}/>
                </CardBody>
            </Card>
        );
    }
}

export default Map;

//                <CardTitle style={{ margin: 0, padding: 0, fontSize: 20, fontWeight: 'bold', color: '#fdfdfd' }}>농장위치</CardTitle>