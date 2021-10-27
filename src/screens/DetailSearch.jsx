import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import DetailSearchNav from '../components/DetailSearchNav';
import DetailSearchValue from '../components/DetailSearchValue';
import { farmdata } from '../data/FarmData';

class DetailSearch extends Component {

    routeCreate = () => {
        const { match } = this.props;
        return farmdata.map((item)=>{
            return <Route key={item.key} path={`${match.path}/farm/${item.id}`} 
            render={() => {
                return <DetailSearchValue 
                title={item.title} 
                lat={item.lat}
                lng={item.lng}
                farmkey={item.farmkey}
                />
            }}/>
        })
    }

    render() {
        const { match } = this.props;
        return (
            <div>
                <DetailSearchNav match={match}/>
                <Switch>
                    <Route exact path={`${match.path}`} 
                    render={()=>{
                        return <Redirect to={`${match.path}/farm/1`}/>
                    }}/>
                    {this.routeCreate()}
                </Switch>
            </div>
        ); 
    }
}

export default withRouter(DetailSearch);