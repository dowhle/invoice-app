import React, { Component } from 'react';
import { connect } from 'react-redux';

import { productChange, productDetailFetch } from '../../store/actions';
import { selectProductDetail } from '../../store/selectors';
import { setDocumentTitle } from '../../tools';

import ProductFormPopup from "../../components/ProductFormPopup";
import productListRoute from '../ProductList/route';

class ProductChange extends Component{
  componentWillMount(){
    setDocumentTitle('Change Product');
    this.props.fetchProductDetail(this.props.params.id)
  }
  formSubmitHandler = (data) => {
    this.props.changeProduct(this.props.params.id, data)
  };
  hideHandler = () => {
    setDocumentTitle('Products');
    this.props.router.push(productListRoute.path);
  };
  render(){
    return(
      <ProductFormPopup show={true} onHide={this.hideHandler}
                         product={this.props.product} label="Change product" onSubmit={this.formSubmitHandler}/>
    )
  }
}
export default connect(
  (state) => ({
    product: selectProductDetail(state)
  }),
  (dispatch) => ({
    changeProduct: (id, data) => dispatch(productChange.requestWithPayload({id, data})),
    fetchProductDetail: (id) => dispatch(productDetailFetch.requestWithPayload({id})),
  })
)(ProductChange)