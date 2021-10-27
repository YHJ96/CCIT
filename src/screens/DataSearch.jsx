import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import DataSearchIndi from '../components/DataSearchIndi';
// import DataSearchLog from '../components/DataSearchLog';
import DataSearchMulti from '../components/DataSearchMulti';
import DataSearchNav from '../components/DataSearchNav';

class DataSearch extends Component {
    render() {
        const { match } = this.props;
        return (
            <div>
                <DataSearchNav match={match}/>
                <Switch>
                    <Route exact path={`${match.path}`} render={()=>{
                        return <Redirect to={`${match.path}/indi`}/>
                    }}/>
                    <Route path={`${match.path}/indi`} component={DataSearchIndi}/>
                    <Route path={`${match.path}/multi`} component={DataSearchMulti}/>
                </Switch>
            </div>
        );
    }
}

//  <Route path={`${match.path}/log`} component={DataSearchLog}/>

export default withRouter(DataSearch);