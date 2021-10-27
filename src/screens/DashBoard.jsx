import React, { Component } from 'react';
import {  Route, Switch, Redirect, withRouter } from 'react-router-dom';
import DashBoardNav from '../components/DashBoardNav';
import DashBoardMap from '../components/DashBoardMap';
import DashBoardSensor from '../components/DashBoardSensor';
import DashBoardChart from '../components/DashBoardChart';
import DashBoardMoter from '../components/DashBoardMoter';

class DashBoard extends Component {
    render() {
        const { match } = this.props;
        console.log('Dashboard')
        return (
            <div>
                <DashBoardNav match={match}/>
                <Switch>
                    <Route exact path={`${match.path}`}
                    render={()=>{
                        return <Redirect to={`${match.path}/map`}/>
                    }}
                    />
                    <Route path={`${match.path}/map`} component={DashBoardMap}/>
                    <Route path={`${match.path}/sensor`} component={DashBoardSensor}/>
                    <Route path={`${match.path}/chart`}
                    render={() => <DashBoardChart/>}
                    />
                    <Route path={`${match.path}/moter`} component={DashBoardMoter} /> {/* 사용안함 */} 
                </Switch>
            </div>
        );
    }
}

export default withRouter(DashBoard);