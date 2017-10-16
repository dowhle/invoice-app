import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router'

import { invoiceListFetch, invoiceDelete } from '../../store/actions';
import { selectInvoiceList } from '../../store/selectors';
import { setDocumentTitle } from '../../tools';

import ConfirmPopup from '../../components/ConfirmPopup';


class InvoiceList extends Component{
  constructor(props){
    super(props);
    this.state = {
      deletionPopupIsOpened: false,
      deleteInvoiceId: null
    }
  }
  componentDidMount(){
    this.props.fetchInvoiceList();
  };
  componentWillMount(){
    setDocumentTitle('Invoices');
  }
  showDeletionPopup = (id) => {
    this.setState({deletionPopupIsOpened: true, deleteInvoiceId: id})
  };
  hideDeletionPopup = () => {
    this.setState({deletionPopupIsOpened: false})
  };
  deletionConfirmHandler = () => {
    this.setState(
      {deletionPopupIsOpened: false},
      () => this.props.deleteInvoice(this.state.deleteInvoiceId)
    )
  };
  renderInvoicesRows(invoices){
    return invoices.map((invoice) =>
      <tr key={invoice.id}>
        <td>{invoice.id}</td>
        <td>{invoice.customer ? invoice.customer.name : 'None'}</td>
        <td>{invoice.discount}</td>
        <td>{invoice.total}</td>
        <td width="1%">
          <Link to={`/invoices/change/${invoice.id}`}>Edit</Link>
        </td>
        <td width="1%">
          <Button onClick={() => this.showDeletionPopup(invoice.id)}>Delete</Button>
        </td>
      </tr>
    )
  };
  render(){
    return(
      <div>
        <div>
          <h1>Invoice list</h1>
          <Link to="/invoices/create">Create</Link>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.renderInvoicesRows(this.props.invoices)}
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
    invoices: selectInvoiceList(state)
  }),
  (dispatch) => ({
    fetchInvoiceList: () => dispatch(invoiceListFetch.request),
    deleteInvoice: (id) => dispatch(invoiceDelete.requestWithPayload({id}))
  })
)(InvoiceList)




