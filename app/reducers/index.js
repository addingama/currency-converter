import { combineReducers } from 'redux';

import currencies from './currencies';
import theme from './theme';
import nav from './nav';
import network from './network';

export default combineReducers({
  currencies,
  theme,
  nav,
  network,
});
