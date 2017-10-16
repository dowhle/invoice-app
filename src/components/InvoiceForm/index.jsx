import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import validator from 'validator';

import AddProductController from '../AddProductController';

export default class InvoiceForm extends Component{
  constructor(props){
    super(props);
    if(props.invoice) {
      this.state = {
        discount: props.invoice.discount,
        customer: props.invoice.customer_id,
        products: props.invoice.products,
      }
    }
    else {
      this.state = {
        discount: '',
        customer: '',
        products: [],
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.invoice){
      this.setState({
        discount: nextProps.invoice.discount,
        customer: nextProps.invoice.customer_id,
        products: nextProps.invoice.products
      })
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    if(this.props.onSubmit)
      this.props.onSubmit(
        {
          discount: this.state.discount,
          customer_id: this.state.customer,
          total: this.calculateTotalPrice(this.state.products, this.state.discount)
        },
        this.state.products
      )
  };

  fieldChangeHandler = (fieldName) => (e) => {
    this.setState({
      [fieldName]: e.target.value
    })
  };

  qtyProductChangeHandler = (index) => (e) => {
    const products = this.state.products.slice();
    products[index].quantity = e.target.value;
    this.setState({
      ...this.state,
      products
    })
  };

  getProductById = (id) => {
    for(const product of this.state.products){
      if(product.id === id) return product;
    }
    return null;
  };

  addProductToList = (product) => {
    if(!product || this.getProductById(product.id)) return;
    product.quantity = 1;
    this.setState({products: [ ...this.state.products,  product]})
  };

  deleteProductFromList = (productIndex) => {
    const products = this.state.products.slice();
    products.splice(productIndex, 1);
    this.setState({products})
  };

  calculateTotalPrice(products, discount){
    let result = products.reduce((acc, product) => acc + (product.quantity * product.price), 0);
    if(discount) result -= result * (discount/100);
    return Math.ceil(result * 100) / 100
  }

  isFormValid(fields){
    for(const product of fields.products)
      if(validator.isEmpty(product.quantity.toString())) return false;
    return (validator.isEmpty(fields.discount.toString()) || validator.isNumeric(fields.discount.toString()))
      && !validator.isEmpty(fields.customer.toString())
  };

  renderAvailableCustomers = (availableCustomers) => (
    availableCustomers.map((customer) => (
      <option key={customer.id} value={customer.id}>{customer.name}</option>
    ))
  );

  renderProductsRows = (products) => (
    products.map((product, index) => {
      return(
        <tr key={product.id}>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <FormControl type="number" value={product.quantity} onChange={this.qtyProductChangeHandler(index)}/>
          </td>
          <td width="1%"><Button onClick={() => this.deleteProductFromList(index)}>Delete</Button></td>
        </tr>
      )
    })
  );

  render(){
    return(
      <Form onSubmit={this.submitHandler}>
        <h1>{this.props.label}</h1>
        <FormGroup>
          <ControlLabel>Discount(%)</ControlLabel>
          <FormControl type="number" value={this.state.discount} onChange={this.fieldChangeHandler('discount')}/>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Customer</ControlLabel>
          <FormControl componentClass="select" value={this.state.customer} onChange={this.fieldChangeHandler('customer')}>
            <option disabled value="">Select...</option>
            {this.renderAvailableCustomers(this.props.availableCustomers)}
          </FormControl>
        </FormGroup>

        <AddProductController availableProducts={this.props.availableProducts} onAdd={this.addProductToList}/>

        <Table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
          </tr>
          </thead>
          <tbody>
          {this.renderProductsRows(this.state.products)}
          </tbody>
        </Table>

        <div>
          <b>Total: {this.calculateTotalPrice(this.state.products, this.state.discount)}</b>
        </div>
        <Button disabled={!this.isFormValid(this.state)} bsStyle="primary" type="submit">Submit</Button>
      </Form>
    )
  }
}

InvoiceForm.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  invoice: PropTypes.object,
  products: PropTypes.array,
  availableProducts: PropTypes.array.isRequired,
  availableCustomers: PropTypes.array.isRequired,
};
