import React from 'react';
import BasePage from './components/BasePage';

import customerListRoute from './containers/CustomerList/route';
import productListRoute from './containers/ProductList/route';
import invoiceListRoute from './containers/InvoiceList/route';
import invoiceCreateRoute from './containers/InvoiceCreate/route';
import invoiceChangeRoute from './containers/InvoiceChange/route';


export default [
  {
    path: '/',
    component: BasePage,
    indexRoute: {
      onEnter: (nextState, replace) => replace(invoiceListRoute.path)
    },
    childRoutes: [
      customerListRoute,
      productListRoute,
      invoiceListRoute,
      invoiceCreateRoute,
      invoiceChangeRoute
    ]
  }
]