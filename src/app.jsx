import React from 'react';
import { syncHistoryWithStore } from 'react-router-redux'
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from 'routes';
import configureStore from 'store';
import rootSaga from 'store/sagas';


import 'react-select/dist/react-select.css';


const store = configureStore(browserHistory);
store.runSaga(rootSaga);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router routes={routes} history={history}/>
  </Provider>,
  document.getElementById('app-root')
);





