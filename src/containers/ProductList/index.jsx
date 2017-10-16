import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router'

import { productListFetch, productDelete } from '../../store/actions';
import { selectProductList } from '../../store/selectors';
import { setDocumentTitle } from '../../tools';

import ConfirmPopup from '../../components/ConfirmPopup';

class ProductList extends Component{
  constructor(props){
    super(props);
    this.state = {
      deletionPopupIsOpened: false,
      deleteProductId: null
    }
  }
  componentDidMount(){
    this.props.fetchProductList();
  };
  componentWillMount(){
    setDocumentTitle('Products');
  }
  showDeletionPopup = (id) => {
    this.setState({deletionPopupIsOpened: true, deleteProductId: id})
  };
  hideDeletionPopup = () => {
    this.setState({deletionPopupIsOpened: false})
  };
  deletionConfirmHandler = () => {
    this.setState(
      {deletionPopupIsOpened: false},
      () => this.props.deleteProduct(this.state.deleteProductId)
    )
  };
  renderProductsRows(products){
    return products.map((product) =>
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td width="1%">
          <Link to={`/products/change/${product.id}`}>Edit</Link>
        </td>
        <td width="1%">
          <Button onClick={() => this.showDeletionPopup(product.id)}>Delete</Button>
        </td>
      </tr>
    )
  };
  render(){
    return(
      <div>
        <div>
          <h1>Product list</h1>
          <Link to="/products/create">Create</Link>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.renderProductsRows(this.props.products)}
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
    products: selectProductList(state)
  }),
  (dispatch) => ({
    fetchProductList: () => dispatch(productListFetch.request),
    deleteProduct: (id) => dispatch(productDelete.requestWithPayload({id}))
  })
)(ProductList)




