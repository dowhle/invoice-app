import React, { Component } from 'react';
import { connect } from 'react-redux';

import { customerCreate } from '../../store/actions';
import { setDocumentTitle } from '../../tools';

import CustomerFormPopup from "../../components/CustomerFormPopup";
import customerListRoute from '../CustomerList/route';

class CustomerCreate extends Component{
  componentWillMount(){
    setDocumentTitle('Create Customer');
  }
  formSubmitHandler = (data) => {
    this.props.createCustomer(data)
  };
  hideHandler = () => {
    setDocumentTitle('Customers');
    this.props.router.push(customerListRoute.path)
  };
  render(){
    return(
      <CustomerFormPopup show={true} onHide={this.hideHandler}
                         label="Create customer" onSubmit={this.formSubmitHandler}/>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    createCustomer: (data) => dispatch(customerCreate.requestWithPayload({data})),
  })
)(CustomerCreate)




