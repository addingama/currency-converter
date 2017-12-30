import React from 'react';
import { connect, Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import Navigator from './config/routes';
import { AlertProvider } from './components/Alert';
import store from './config/store';

import buildStyles from './config/styles';

buildStyles();

const App = ({ dispatch, nav }) => (
  <Navigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
    })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav,
});

const AppWithNavigation = connect(mapStateToProps)(App);

export default () => (
  <Provider store={store}>
    <AlertProvider>
      <AppWithNavigation onNavigationStateChange={null} />
    </AlertProvider>
  </Provider>
);
