import * as types from './typeConstants';

function createRequestAction(type) {
  return {
    request: {type: type.REQUEST},
    requestWithPayload: payload => ({type: type.REQUEST, payload}),
    start: {type: type.START},
    success: (res) => ({type: type.SUCCESS, payload: res}),
    failure: (res) => ({type: type.FAILURE, payload: res}),
  }
}

export const customerListFetch = createRequestAction(types.CUSTOMER_LIST_FETCH);
export const customerCreate = createRequestAction(types.CUSTOMER_CREATE);
export const customerChange = createRequestAction(types.CUSTOMER_CHANGE);
export const customerDetailFetch = createRequestAction(types.CUSTOMER_DETAIL_FETCH);
export const customerDelete = createRequestAction(types.CUSTOMER_DELETE);

export const productListFetch = createRequestAction(types.PRODUCT_LIST_FETCH);
export const productCreate = createRequestAction(types.PRODUCT_CREATE);
export const productChange = createRequestAction(types.PRODUCT_CHANGE);
export const productDetailFetch = createRequestAction(types.PRODUCT_DETAIL_FETCH);
export const productDelete = createRequestAction(types.PRODUCT_DELETE);

export const invoiceListFetch = createRequestAction(types.INVOICE_LIST_FETCH);
export const invoiceCreate = createRequestAction(types.INVOICE_CREATE);
export const invoiceChange = createRequestAction(types.INVOICE_CHANGE);
export const invoiceDetailFetch = createRequestAction(types.INVOICE_DETAIL_FETCH);
export const invoiceDelete = createRequestAction(types.INVOICE_DELETE);
