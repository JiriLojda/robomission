import React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import AppContainer from './containers/AppContainer';
import {Provider} from 'react-intl-redux';
import {globalConfiguration} from './config';
import {createFlocsStore} from './store';
import FlocsThemeProvider from './theme/FlocsThemeProvider';
import {StrategyPage} from "./pages/StrategyPage";
import {StrategySimpleLevel} from "./containers/StrategySimpleLevel";
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
      <BrowserRouter>
        <AppContainer>
          <Switch>
            <Redirect exact from="/" to="/strategy" />
            <Route exact path="/strategy" component={StrategyPage} />
            <Route exact path="/duel-strategy" component={DuelStrategyPage} />
            <Route exact path="/strategy/level/:urlSlug" render={props => <StrategySimpleLevel levelUrlSlug={props.match.params.urlSlug}/>} />
            <Route exact path="/duel-strategy/level/:urlSlug" render={props => <DuelStrategyEditor levelUrlSlug={props.match.params.urlSlug}/>} />
          </Switch>
        </AppContainer>
      </BrowserRouter>
    </FlocsThemeProvider>
  </Provider>
);

const mountElement = document.getElementById('flocsApp');
ReactDOM.render(app, mountElement);
//registerServiceWorker();
