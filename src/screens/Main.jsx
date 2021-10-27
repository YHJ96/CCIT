import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Plant from './Plant';
import DashBoard from './DashBoard';
import DataSearch from './DataSearch';
import DetailSearch from './DetailSearch';
import Navi from './Navi';
import Setting from './Setting';
import Axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Main extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    
    componentDidMount(){
        this.jwtToken();
    }

    jwtToken = async() => {
        const { cookies } = this.props;
        const { history } = this.props;
        await Axios.post('http://192.168.0.1/auth',{},{
            headers : {'jwt': `${cookies.get('jwt')}`}
        })
        .then((res)=>{
            console.log(res.data)
            if(res.data.statusCode !== 200) {
                alert(res.data.statusCode)
                return history.push('/notfound')
            }
        })
        .catch((err)=>{
            alert(err);
        })
    } 
    render() {
        const { match, history } = this.props;
        console.log('Main')
        return (
            <div style={{ background: '#212528', height: '100%', width: '100%'}}>
                <Navi match={match} history={history}/>
                <Switch>
                    <Route exact path={`${match.path}`} 
                    render={()=>{
                        return <Redirect to={`${match.path}/dashboard`}/>
                    }}
                    />
                    <Route path={`${match.path}/dashboard`}
                    render={() => <DashBoard/>}
                    />
                    <Route path={`${match.path}/detailsearch`} component={DetailSearch}/>
                    <Route path={`${match.path}/datasearch`} component={DataSearch}/>
                    <Route path={`${match.path}/plant`} 
                    render={()=> <Plant/>}/>
                    <Route path={`${match.path}/setting`} 
                    render={() => <Setting />}
                    />
                </Switch>
            </div>
        );
    }
}
export default withCookies(Main);