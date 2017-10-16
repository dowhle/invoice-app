import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class AddProductController extends Component{
  constructor(props){
    super(props);
    this.state = {
      productIndex: ''
    }
  }

  fieldChangeHandler = (fieldName) => (e) => {
    this.setState({
      [fieldName]: e.target.value
    })
  };

  renderAvailableProducts = (availableProducts) => (
    availableProducts.map((product, index) => (
      <option key={product.id} value={index}>{product.name}</option>
    ))
  );

  addHandler = () => {
    this.props.onAdd(this.props.availableProducts[this.state.productIndex]);
  };

  render(){
    return(
      <FormGroup>
        <ControlLabel>Add product</ControlLabel>
        <FormControl componentClass="select" value={this.state.productIndex} onChange={this.fieldChangeHandler('productIndex')}>
          <option disabled value="">Select...</option>
          {this.renderAvailableProducts(this.props.availableProducts)}
        </FormControl>
        <Button onClick={this.addHandler}>Add</Button>
      </FormGroup>
    )
  }
}

AddProductController.propTypes = {
  onAdd: PropTypes.func.isRequired,
  availableProducts: PropTypes.array.isRequired
};



