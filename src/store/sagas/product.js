import { put, call, takeEvery  } from 'redux-saga/effects';
import { requestProduct } from '../../api';
import * as actions from '../actions';
import * as types from '../typeConstants';
import { push } from 'react-router-redux';

import productListRoute from '../../containers/ProductList/route';


function* productListFetch() {
  try {
    yield put(actions.productListFetch.start);
    const response = yield call(requestProduct.all);
    yield put(actions.productListFetch.success(response));
  }
  catch(error) {
    yield put(actions.productListFetch.failure({error}));
  }
}

function* productCreate({ payload: {data} }) {
  try {
    yield put(actions.productCreate.start);
    const response = yield call(requestProduct.create, data);
    yield put(actions.productCreate.success(response));
    yield put(actions.productListFetch.request);
    yield put(push(productListRoute.path));
  }
  catch(error) {
    yield put(actions.productCreate.failure({error}));
  }
}

function* productChange({ payload: {id, data} }) {
  try {
    yield put(actions.productChange.start);
    const response = yield call(requestProduct.change, id, data);
    yield put(actions.productChange.success(response));
    yield put(actions.productListFetch.request);
    yield put(push(productListRoute.path));
  }
  catch(error) {
    yield put(actions.productChange.failure({error}));
  }
}

function* productDetailFetch({ payload: {id} }) {
  try {
    yield put(actions.productDetailFetch.start);
    const response = yield call(requestProduct.one, id);
    yield put(actions.productDetailFetch.success(response));
  }
  catch(error) {
    yield put(actions.productDetailFetch.failure({error}));
  }
}

function* productDelete({ payload: {id} }) {
  try {
    yield put(actions.productDelete.start);
    const response = yield call(requestProduct.delete, id);
    yield put(actions.productDelete.success(response));
    yield put(actions.productListFetch.request);
  }
  catch(error) {
    yield put(actions.productDelete.failure({error}));
  }
}

export default function*() {
  yield takeEvery(types.PRODUCT_LIST_FETCH.REQUEST, productListFetch);
  yield takeEvery(types.PRODUCT_CREATE.REQUEST, productCreate);
  yield takeEvery(types.PRODUCT_CHANGE.REQUEST, productChange);
  yield takeEvery(types.PRODUCT_DETAIL_FETCH.REQUEST, productDetailFetch);
  yield takeEvery(types.PRODUCT_DELETE.REQUEST, productDelete);

}