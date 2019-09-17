import React from 'react';
import {
  Router,
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Landing from './Pages/Landing';

import { createBrowserHistory } from "history";
export const hist = createBrowserHistory();

class App extends React.Component {
    
  render() {   
    return (
      <HashRouter history={hist}> 
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/index.html" component={Landing} />
        </Switch>
      </HashRouter>
    );
  }
}

export default withRouter(App);
