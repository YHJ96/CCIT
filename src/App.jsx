import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './screens/Main';
import ChangePW from './users/ChangePW';
import Login from './users/Login';
import NotFound from './users/NotFound';
import Update from './update/Update';
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path={'/'} component={Login}/>
        <Route path={'/main'} component={Main}/>
        <Route path={'/notfound'} component={NotFound}/>
        <Route path={'/changepw'} component={ChangePW}/>
        <Route path={'/tv'} component={Update}/>
      </Switch>
    );
  }
}

export default App;