import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

export default class ConfirmPopup extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.onCancel}>
        <Modal.Header>
          <Modal.Title>You are sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button onClick={this.props.onConfirm}>Confirm</Button>
        </Modal.Body>
      </Modal>
    )
  }
}

ConfirmPopup.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
