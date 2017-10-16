import { put, call, takeEvery  } from 'redux-saga/effects';
import { requestCustomer } from '../../api';
import * as actions from '../actions';
import * as types from '../typeConstants';
import { push } from 'react-router-redux';

import customerListRoute from '../../containers/CustomerList/route';

function* customerListFetch() {
  try {
    yield put(actions.customerListFetch.start);
    const response = yield call(requestCustomer.all);
    yield put(actions.customerListFetch.success(response))
  }
  catch(error) {
    yield put(actions.customerListFetch.failure({error}));
  }
}

function* customerCreate({ payload: {data} }) {
  try {
    yield put(actions.customerCreate.start);
    const response = yield call(requestCustomer.create, data);
    yield put(actions.customerCreate.success(response));
    yield put(actions.customerListFetch.request);
    yield put(push(customerListRoute.path));
  }
  catch(error) {
    yield put(actions.customerCreate.failure(error));
  }
}

function* customerChange({ payload: {id, data} }) {
  try {
    yield put(actions.customerChange.start);
    const response = yield call(requestCustomer.change, id, data);
    yield put(actions.customerChange.success(response));
    yield put(actions.customerListFetch.request);
    yield put(push(customerListRoute.path));
  }
  catch(error) {
    yield put(actions.customerChange.failure({error}));
  }
}

function* customerDetailFetch({ payload: {id} }) {
  try {
    yield put(actions.customerDetailFetch.start);
    const response = yield call(requestCustomer.one, id);
    yield put(actions.customerDetailFetch.success(response));
  }
  catch(error) {
    yield put(actions.customerDetailFetch.failure({error}));
  }
}

function* customerDelete({ payload: {id} }) {
  try {
    yield put(actions.customerDelete.start);
    const response = yield call(requestCustomer.delete, id);
    yield put(actions.customerDelete.success(response));
    yield put(actions.customerListFetch.request)
  }
  catch(error) {
    yield put(actions.customerDelete.failure({error}));
  }
}

export default function*() {
  yield takeEvery(types.CUSTOMER_LIST_FETCH.REQUEST, customerListFetch);
  yield takeEvery(types.CUSTOMER_CREATE.REQUEST, customerCreate);
  yield takeEvery(types.CUSTOMER_CHANGE.REQUEST, customerChange);
  yield takeEvery(types.CUSTOMER_DETAIL_FETCH.REQUEST, customerDetailFetch);
  yield takeEvery(types.CUSTOMER_DELETE.REQUEST, customerDelete);

}