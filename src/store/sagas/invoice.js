import { put, call, takeEvery } from 'redux-saga/effects';
import { requestInvoice, requestInvoiceProductRelationship, requestCustomer, requestProduct } from '../../api';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import * as types from '../typeConstants';

import invoiceListRoute from '../../containers/InvoiceList/route';


function* invoiceListFetch() {
  try {
    yield put(actions.invoiceListFetch.start);
    const response = yield call(requestInvoice.all);
    for(const [index, invoice] of response.result.entries()){
      const customerResponse = yield call(requestCustomer.one, invoice.customer_id);
      response.result[index].customer = customerResponse.result;
    }
    yield put(actions.invoiceListFetch.success(response));
  }
  catch(error) {
    yield put(actions.invoiceListFetch.failure({error}));
  }
}


function* invoiceDetailFetch({ payload: {id} }) {
  try {
    yield put(actions.invoiceDetailFetch.start);
    const response = yield call(requestInvoice.one, id);
    response.result.products = yield call(getInvoiceProductList, id);
    yield put(actions.invoiceDetailFetch.success(response))
  }
  catch(error) {
    yield put(actions.invoiceDetailFetch.failure({error}));
  }
}

function* invoiceCreate({ payload: {invoiceData, productsData} }) {
  try {
    yield put(actions.invoiceCreate.start);
    const response = yield call(requestInvoice.create, invoiceData);
    for(const productData of productsData)
      yield call(requestInvoiceProductRelationship.create, response.result.id, {
        product_id: productData.id,
        quantity: productData.quantity
      });
    yield put(actions.invoiceCreate.success(response));
    yield put(push(invoiceListRoute.path));
  }
  catch(error) {
    yield put(actions.invoiceCreate.failure({error}));
  }
}

function* invoiceChange({ payload: {id, invoiceData, productsData} }) {
  try {
    yield put(actions.invoiceChange.start);
    const response = yield call(requestInvoice.change, id, invoiceData, productsData);
    yield call(changeInvoiceProductList, id, productsData);
    yield put(actions.invoiceChange.success(response));
    yield put(push(invoiceListRoute.path));
  }
  catch(error) {
    yield put(actions.invoiceChange.failure({error}));
  }
}


function* invoiceDelete({ payload: {id} }) {
  try {
    yield put(actions.invoiceDelete.start);
    const response = yield call(requestInvoice.delete, id);
    yield put(actions.invoiceDelete.success(response));
    yield put(actions.invoiceListFetch.request);
  }
  catch(error) {
    yield put(actions.invoiceDelete.failure({error}));

  }
}

function* getInvoiceProductList(invoiceId) {
  const {result: relationships} = yield call(requestInvoiceProductRelationship.all, invoiceId);
  const products = [];
  for(const relationship of relationships){
    const {result: product} = yield call(requestProduct.one, relationship.product_id);
    if(!product) continue;
    product.quantity = relationship.quantity;
    products.push(product);
  }
  return products;
}

function* changeInvoiceProductList(invoiceId, productsData) {
  const {result: relationships} = yield call(requestInvoiceProductRelationship.all, invoiceId);
  for(const relationship of relationships){
    const product = yield call(getProductById, productsData, relationship.product_id);
    if(!product)
      yield call(requestInvoiceProductRelationship.delete, invoiceId, relationship.id);
  }
  for(const productData of productsData){
    const relationship = yield call(getRelationshipByProductId, relationships, productData.id);
    if(relationship)
      yield call(requestInvoiceProductRelationship.change, invoiceId, relationship.id, {
        product_id: productData.id,
        quantity: productData.quantity
      });
    else
      yield call(requestInvoiceProductRelationship.create, invoiceId, {
        product_id: productData.id,
        quantity: productData.quantity
      });
  }
}

function getProductById(products, id){
  for(const product of products)
    if(product.id === id) return product;
  return null
}

function getRelationshipByProductId(relationships, productId){
  for(const relationship of relationships)
    if(relationship.product_id === productId) return relationship;
  return null
}

export default function*() {
  yield takeEvery(types.INVOICE_LIST_FETCH.REQUEST, invoiceListFetch);
  yield takeEvery(types.INVOICE_CREATE.REQUEST, invoiceCreate);
  yield takeEvery(types.INVOICE_CHANGE.REQUEST, invoiceChange);
  yield takeEvery(types.INVOICE_DETAIL_FETCH.REQUEST, invoiceDetailFetch);
  yield takeEvery(types.INVOICE_DELETE.REQUEST, invoiceDelete);
}