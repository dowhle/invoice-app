import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';

export default class Header extends Component{
  render(){
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">Invoice App</IndexLink>
          </Navbar.Brand>
        </Navbar.Header>
        <div className="nav navbar-nav">
          <li><Link to="/invoices">Invoices</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/customers">Customers</Link></li>
        </div>
      </Navbar>
    )
  }
}
