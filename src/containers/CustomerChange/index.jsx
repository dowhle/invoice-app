import React, { Component } from 'react';
import { connect } from 'react-redux';

import { customerChange, customerDetailFetch } from '../../store/actions';
import { selectCustomerDetail } from '../../store/selectors';
import { setDocumentTitle } from '../../tools';

import customerListRoute from '../CustomerList/route';
import CustomerFormPopup from "../../components/CustomerFormPopup";

class CustomerChange extends Component{
  componentWillMount(){
    setDocumentTitle('Change Customer');
    this.props.fetchCustomerDetail(this.props.params.id)
  }
  formSubmitHandler = (data) => {
    this.props.changeCustomer(this.props.params.id, data);
  };
  hideHandler = () => {
    setDocumentTitle('Customers');
    this.props.router.push(customerListRoute.path);
  };
  render(){
    return(
      <CustomerFormPopup show={true} onHide={this.hideHandler}
                         customer={this.props.customer} label="Change customer" onSubmit={this.formSubmitHandler}/>
    )
  }
}

export default connect(
  (state) => ({
    customer: selectCustomerDetail(state)
  }),
  (dispatch) => ({
    changeCustomer: (id, data) => dispatch(customerChange.requestWithPayload({id, data})),
    fetchCustomerDetail: (id) => dispatch(customerDetailFetch.requestWithPayload({id})),
  })
)(CustomerChange)