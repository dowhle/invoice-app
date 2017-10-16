import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import validator from 'validator';
import PropTypes from 'prop-types';

export default class ProductFormPopup extends Component{
  constructor(props){
    super(props);
    if(props.product) {
      this.state = {
        name: props.product.name,
        price: props.product.price,
      }
    }
    else {
      this.state = {
        name: '',
        price: '',
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.product){
      this.setState({
        name: nextProps.product.name,
        price: nextProps.product.price,
      })
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    if(this.props.onSubmit)
      this.props.onSubmit(this.state)
  };

  fieldChangeHandler = (fieldName) => {
    return (e) => this.setState({[fieldName]: e.target.value})
  };

  isFormValid(fields){
    for(const field of Object.values(fields))
      if(validator.isEmpty(field.toString())) return false;
    return validator.isCurrency(fields.price.toString(), { allow_negatives: false})
  }

  render(){
    return(
      <Modal onShow={this.props.onShow} show={this.props.show}>

        <Modal.Header>
          <Modal.Title>{this.props.label}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.submitHandler}>

            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <FormControl type="text" value={this.state.name} onChange={this.fieldChangeHandler('name')}/>
            </FormGroup>


            <FormGroup>
              <ControlLabel>Price</ControlLabel>
              <FormControl type="text" value={this.state.price} onChange={this.fieldChangeHandler('price')}/>
            </FormGroup>

            <Button disabled={!this.isFormValid(this.state)} bsStyle="primary" type="submit">Submit</Button>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onHide}>Cancel</Button>
        </Modal.Footer>

      </Modal>
    )
  }
}

ProductFormPopup.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  product: PropTypes.object,
  onShow: PropTypes.func,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};



