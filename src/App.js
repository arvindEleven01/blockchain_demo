import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Landing from './Pages/Landing';

// import { createBrowserHistory } from "history";
// export const hist = createBrowserHistory();

class App extends React.Component {
    
  render() {   
    return (
      <HashRouter > 
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/index.html" component={Landing} />
        </Switch>
      </HashRouter>
    );
  }
}

export default withRouter(App);
