import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import SettingInfoValue from './SettingInfoValue';
import { farmdata } from '../data/FarmData';
import SettingInfoNav from './SettingInfoNav';

class SettingInfo extends Component {
    constructor(props){
        super(props)
        const { match } = this.props;
        this.match = match;
    }
    createRoute = () => {
        return farmdata.map((item)=>{
            return <Route 
            key={item.key} 
            path={`${this.match.path}/${item.farmkey}`} 
            render={() => {
            return <SettingInfoValue 
            farmkey={item.farmkey}
            title={item.title}
            />
        }}/>
        })
    }
    render() {
        return (
            <div>
                <SettingInfoNav match={this.match}/>
                <Switch>
                    <Route 
                    exact 
                    path={`${this.match.path}`} 
                    render={() => {
                        return <Redirect to={`${this.match.path}/1`}/>
                    }}/>
                    {this.createRoute()}
                </Switch>
            </div>
        );
    }
}

export default withRouter(SettingInfo);