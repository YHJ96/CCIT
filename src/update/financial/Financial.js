import React, { PureComponent } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { inject, Observer } from 'mobx-react';

@inject('weatherstore')
@Observer
class Financial extends PureComponent {
    constructor(props){
        super(props)
        this.cookies = this.props.cookies;
        this.delay = 1000 * 60 * 60;
        this.state = {
            isLoding : false
        }
    }

    componentDidMount() {
        this.isRenderSet();
        this.resetWind = setInterval(this.isRender, this.delay);
    }

    componentWillUnmount() {
        clearInterval(this.resetWind)
    }

    isRenderSet = () => {
       setTimeout(this.isRender, 5000)
    }

    isRender = () => {
        this.setState(({isLoding})=>({
            isLoding: !isLoding
        }))
    }

    degDirection = () => {
        let windDeg = this.props.weatherstore.windDeg
        if((0 <= windDeg && windDeg <= 22) || (337 <= windDeg && windDeg <= 360) ) {
            return '북'
        } else if(23 <= windDeg && windDeg <= 67) {
            return '북동'
        } else if(68 <= windDeg && windDeg <= 111) {
            return '동'
        } else if(112 <= windDeg && windDeg <= 157) {
            return '남동'
        }else if(158 <= windDeg && windDeg <= 202) {
            return '남'
        }else if(203 <= windDeg && windDeg <= 247) {
            return '남서'
        }else if(248 <= windDeg && windDeg <= 292) {
            return '서'
        }else if(293 <= windDeg && windDeg <= 336) {
            return '북서'
        }
    }

    render() {
        return (
        <Card className="mt-2" style={{ height: '93%', backgroundColor: '#2f3237', color: '#fdfdfd' }}>
            <CardBody style={{ height: '100%' }}>
                <CardTitle tag="h6" className="mb-2">
                    Wind Info
                </CardTitle>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <div className="mb-1">
                        <h3>{`풍속: ${this.props.weatherstore.windSpeed}m/s`}</h3>
                    </div>
                    <div className="mb-1">
                        <h3>{`풍향: ${this.degDirection()}쪽`}</h3>
                    </div>
                </div>
            </CardBody>
        </Card>
        );
    }
}

export default Financial;