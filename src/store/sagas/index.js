import { all } from 'redux-saga/effects';

import customerSaga from './customer';
import productSaga from './product';
import invoiceSaga from './invoice';

export default function* root() {
  yield all([
    customerSaga(),
    productSaga(),
    invoiceSaga()
  ])
}