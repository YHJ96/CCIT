import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import SettingInfo from '../components/SettingInfo';
import SettingUsers from '../components/SettingUsers';
import SettingLog from '../components/SettingLog';
import SettingNav from '../components/SettingNav';

class Setting extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <SettingNav match={match}/>
        <Switch>
          <Route exact path={`${match.path}`} 
          render={()=>{
            return <Redirect to={`${match.path}/log`}/>
          }}/>
          <Route path={`${match.path}/log`} component={SettingLog}/>
          <Route path={`${match.path}/users`} component={SettingUsers}/>
          <Route path={`${match.path}/info`} component={SettingInfo}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(Setting);