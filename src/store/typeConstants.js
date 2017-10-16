function createRequestConstant(base) {
  return ['REQUEST', 'START', 'SUCCESS', 'FAILURE'].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc
  }, {})
}

export const CUSTOMER_LIST_FETCH = createRequestConstant('CUSTOMER_LIST_FETCH');
export const CUSTOMER_CREATE = createRequestConstant('CUSTOMER_CREATE');
export const CUSTOMER_CHANGE = createRequestConstant('CUSTOMER_CHANGE');
export const CUSTOMER_DETAIL_FETCH = createRequestConstant('CUSTOMER_DETAIL_FETCH');
export const CUSTOMER_DELETE = createRequestConstant('CUSTOMER_DELETE');

export const PRODUCT_LIST_FETCH = createRequestConstant('PRODUCT_LIST_FETCH');
export const PRODUCT_CREATE = createRequestConstant('PRODUCT_CREATE');
export const PRODUCT_CHANGE = createRequestConstant('PRODUCT_CHANGE');
export const PRODUCT_DETAIL_FETCH = createRequestConstant('PRODUCT_DETAIL_FETCH');
export const PRODUCT_DELETE = createRequestConstant('PRODUCT_DELETE');

export const INVOICE_LIST_FETCH = createRequestConstant('INVOICE_LIST_FETCH');
export const INVOICE_CREATE = createRequestConstant('INVOICE_CREATE');
export const INVOICE_CHANGE = createRequestConstant('INVOICE_CHANGE');
export const INVOICE_DETAIL_FETCH = createRequestConstant('INVOICE_DETAIL_FETCH');
export const INVOICE_DELETE = createRequestConstant('INVOICE_DELETE');
