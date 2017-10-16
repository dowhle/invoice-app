import React, { Component } from 'react';
import { connect } from 'react-redux';

import { invoiceCreate, productListFetch, customerListFetch } from '../../store/actions';
import { selectProductList, selectCustomerList } from '../../store/selectors';
import { setDocumentTitle } from '../../tools';

import InvoiceForm from "../../components/InvoiceForm";

class InvoiceCreate extends Component{
  componentDidMount(){
    this.props.fetchAvailableProducts();
    this.props.fetchAvailableCustomers();
  }
  componentWillMount(){
    setDocumentTitle('Create Invoice')
  }
  formSubmitHandler = (invoiceData, productsData) => {
    this.props.createInvoice(invoiceData, productsData);
  };
  render(){
    return(
      <InvoiceForm availableProducts={this.props.availableProducts} availableCustomers={this.props.availableCustomers}
                   label="Create invoice"  onSubmit={this.formSubmitHandler}/>
    )
  }
}

export default connect(
  (state) => ({
    availableProducts: selectProductList(state),
    availableCustomers: selectCustomerList(state)
  }),
  (dispatch) => ({
    createInvoice: (invoiceData, productsData) => dispatch(invoiceCreate.requestWithPayload({invoiceData, productsData})),
    fetchAvailableProducts: () => dispatch(productListFetch.request),
    fetchAvailableCustomers: () => dispatch(customerListFetch.request),
  })
)(InvoiceCreate)




