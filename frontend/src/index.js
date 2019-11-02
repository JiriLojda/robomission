import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import { Provider } from 'react-intl-redux';
import { globalConfiguration } from './config';
import { createFlocsStore } from './store';
import FlocsThemeProvider from './theme/FlocsThemeProvider';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PracticePage from './pages/PracticePage';
import TaskEditorPage from './pages/TaskEditorPage';
import TasksTableContainer from './containers/TasksTableContainer';
import MonitoringPage from './containers/MonitoringPage';
import PrivateRoute from './containers/PrivateRoute';
import {StrategyPage} from "./pages/StrategyPage";
import {StrategyEditor} from "./containers/StrategyEditor";
import {DuelStrategyPage} from "./pages/DuelStrategyPage";
import {DuelStrategyEditor} from "./containers/DuelStrategyEditor";
import {initialStore} from "./initialStore";

//TODO: setup service worker to work in production
// (see create-react-app for details)
//import registerServiceWorker from './registerServiceWorker';

globalConfiguration();

const store = createFlocsStore(initialStore);
const app = (
  <Provider store={store}>
    <FlocsThemeProvider>
      <BrowserRouter basename={window.location.hostname === 'localhost' ? '' : 'robomission'}>
        <AppContainer>
          <Switch>
            <Redirect exact from="/" to="/strategy" />
            <Redirect exact from="/robomission" to="/robomission/strategy" />
            <Route exact path="/strategy" component={StrategyPage} />
            <Route exact path="/duel-strategy" component={DuelStrategyPage} />
            <Route exact path="/strategy/level/:urlSlug" render={props => <StrategyEditor levelUrlSlug={props.match.params.urlSlug}/>} />
            <Route exact path="/duel-strategy/level/:urlSlug" render={props => <DuelStrategyEditor levelUrlSlug={props.match.params.urlSlug}/>} />
            <Route exact path="robomission/strategy" component={StrategyPage} />
            <Route exact path="robomission/duel-strategy" component={DuelStrategyPage} />
            <Route exact path="robomission/strategy/level/:urlSlug" render={props => <StrategyEditor levelUrlSlug={props.match.params.urlSlug}/>} />
            <Route exact path="robomission/duel-strategy/level/:urlSlug" render={props => <DuelStrategyEditor levelUrlSlug={props.match.params.urlSlug}/>} />
          </Switch>
        </AppContainer>
      </BrowserRouter>
    </FlocsThemeProvider>
  </Provider>
);

const mountElement = document.getElementById('flocsApp');
ReactDOM.render(app, mountElement);
//registerServiceWorker();
