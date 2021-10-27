import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import PlantNav from '../components/PlantNav';
import PlantValue from '../components/PlantValue';
import { farmdata } from '../data/FarmData';
class Plant extends Component {
    createRoute = () => {
        const { match } = this.props;
        return farmdata.map((item)=>{
            return <Route 
            key={item.key} 
            path={`${match.path}/${item.farmkey}`}
            render={ ()=> <PlantValue title={item.title} farmkey={item.farmkey}/>}
            />
        })
    }
    render() {
        const { match } = this.props;
        return (
            <div>
                <PlantNav match={match}/>
                <Switch>
                    <Route exact path={`${match.path}`}
                    render={()=>{
                        return <Redirect to={`${match.path}/1`}/>
                    }}
                    />
                    {this.createRoute()}
                </Switch>
            </div>
        );
    }
}

export default withRouter(Plant);