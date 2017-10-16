import React, { Component } from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import validator from 'validator';

import PropTypes from 'prop-types';

export default class CustomerFormPopup extends Component{
  constructor(props){
    super(props);
    if(props.customer) {
      this.state = {
        name: props.customer.name,
        address: props.customer.address,
        phone: props.customer.phone
      }
    }
    else {
      this.state = {
        name: '',
        address: '',
        phone: ''
      }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.customer){
      this.setState({
        name: nextProps.customer.name,
        address: nextProps.customer.address,
        phone: nextProps.customer.phone
      })
    }
  }

  isFormValid(fields){
    for(const field of Object.values(fields))
      if(validator.isEmpty(field.toString())) return false;
    return validator.isMobilePhone(fields.phone.toString(), 'any')
  }

  submitHandler = (e) => {
    e.preventDefault();
    if(this.props.onSubmit)
      this.props.onSubmit(this.state)
  };

  fieldChangeHandler = (fieldName) => {
    return (e) => this.setState({[fieldName]: e.target.value})
  };

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
              <ControlLabel>Address</ControlLabel>
              <FormControl type="text" value={this.state.address} onChange={this.fieldChangeHandler('address')}/>
            </FormGroup>

            <FormGroup>
              <ControlLabel>Phone</ControlLabel>
              <FormControl type="text" value={this.state.phone} onChange={this.fieldChangeHandler('phone')}/>
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

CustomerFormPopup.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  customer: PropTypes.object,
  onShow: PropTypes.func,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};



