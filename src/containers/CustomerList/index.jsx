import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router'

import { customerListFetch, customerDelete } from '../../store/actions';
import { selectCustomerList } from '../../store/selectors';
import { setDocumentTitle } from '../../tools';

import ConfirmPopup from '../../components/ConfirmPopup';

class CustomerList extends Component{
  constructor(props){
    super(props);
    this.state = {
      deletionPopupIsOpened: false,
      deleteCustomerId: null
    }
  }
  componentDidMount(){
    this.props.fetchCustomerList();
  };
  componentWillMount(){
    setDocumentTitle('Customers');
  }
  showDeletionPopup = (id) => {
    this.setState({deletionPopupIsOpened: true, deleteCustomerId: id})
  };
  hideDeletionPopup = () => {
    this.setState({deletionPopupIsOpened: false})
  };
  deletionConfirmHandler = () => {
    this.setState(
      {deletionPopupIsOpened: false},
      () => this.props.deleteCustomer(this.state.deleteCustomerId)
    )
  };

  renderCustomersRows(customers){
    return customers.map((customer) =>
      <tr key={customer.id}>
        <td>{customer.id}</td>
        <td>{customer.name}</td>
        <td>{customer.address}</td>
        <td>{customer.phone}</td>
        <td width="1%">
          <Link to={`/customers/change/${customer.id}`}>Edit</Link>
        </td>
        <td width="1%">
          <Button onClick={() => this.showDeletionPopup(customer.id)}>Delete</Button>
        </td>
      </tr>
    )
  };
  render(){
    return(
      <div>
        <div>
          <h1>Customer list</h1>
          <Link to="/customers/create">Create</Link>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {this.renderCustomersRows(this.props.customers)}
          </tbody>
        </Table>
        {this.props.children}
        <ConfirmPopup show={this.state.deletionPopupIsOpened}
                      onCancel={this.hideDeletionPopup} onConfirm={this.deletionConfirmHandler}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    customers: selectCustomerList(state)
  }),
  (dispatch) => ({
    fetchCustomerList: () => dispatch(customerListFetch.request),
    deleteCustomer: (id) => dispatch(customerDelete.requestWithPayload({id}))
  })
)(CustomerList)




