import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';


// import FirstPage from './components/FirstPage/FirstPage';

import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        {/* <Route path="/firstpage" component={FirstPage}/> */}
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));


