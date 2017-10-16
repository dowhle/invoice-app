import React, { Component } from 'react';
import { connect } from 'react-redux';

import { invoiceChange, invoiceDetailFetch, productListFetch, customerListFetch } from '../../store/actions';
import { selectProductList, selectCustomerList, selectInvoiceDetail } from '../../store/selectors';
import { setDocumentTitle } from '../../tools';

import InvoiceForm from "../../components/InvoiceForm";

class InvoiceChange extends Component{
  componentDidMount(){
    this.props.fetchAvailableProducts();
    this.props.fetchAvailableCustomers();
    this.props.fetchInvoiceDetail(this.props.params.id);
  }
  componentWillMount(){
    setDocumentTitle('Change Invoice')
  }
  formSubmitHandler = (invoiceData, productsData) => {
    this.props.changeInvoice(this.props.params.id, invoiceData, productsData);
  };
  render(){
    return(
      <InvoiceForm availableProducts={this.props.availableProducts} availableCustomers={this.props.availableCustomers}
                   invoice={this.props.invoice} label="Change invoice" onSubmit={this.formSubmitHandler}/>
    )
  }
}

export default connect(
  (state) => ({
    availableProducts: selectProductList(state),
    availableCustomers: selectCustomerList(state),
    invoice: selectInvoiceDetail(state)
  }),
  (dispatch) => ({
    changeInvoice: (id, invoiceData, productsData) =>
      dispatch(invoiceChange.requestWithPayload({id, invoiceData, productsData})),
    fetchInvoiceDetail: (id) => dispatch(invoiceDetailFetch.requestWithPayload({id})),
    fetchAvailableProducts: () => dispatch(productListFetch.request),
    fetchAvailableCustomers: () => dispatch(customerListFetch.request),
  })
)(InvoiceChange)




