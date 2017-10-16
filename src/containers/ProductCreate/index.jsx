import React, { Component } from 'react';
import { connect } from 'react-redux';

import { productCreate } from '../../store/actions';
import { setDocumentTitle } from '../../tools';

import ProductFormPopup from "../../components/ProductFormPopup";
import productListRoute from '../ProductList/route';

class ProductCreate extends Component{
  componentWillMount(){
    setDocumentTitle('Create Product');
  }
  formSubmitHandler = (data) => {
    this.props.createProduct(data);
  };
  hideHandler = () => {
    setDocumentTitle('Products');
    this.props.router.push(productListRoute.path);
  };
  render(){
    return(
      <ProductFormPopup show={true} onHide={this.hideHandler}
                         label="Create product" onSubmit={this.formSubmitHandler}/>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    createProduct: (data) => dispatch(productCreate.requestWithPayload({data})),
  })
)(ProductCreate)




