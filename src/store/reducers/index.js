import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import customerReducer from './customer';
import productReducer from './product';
import invoiceReducer from './invoice';

export default combineReducers({
  routing: routerReducer,
  customer: customerReducer,
  product: productReducer,
  invoice: invoiceReducer,
})