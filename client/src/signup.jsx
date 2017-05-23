import React, { Component } from 'react'
import { render } from 'react-dom'
const axios = require('axios');


export default class Signup extends Component {
  constructor(props) {
    super(props);

    let number = null;
    let pw = null;
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handlePwChange = this.handlePwChange.bind(this);
  }

  handleNumberChange(event) {
    this.number = event.target.value;
  }
  handlePwChange(event) {
    this.pw = event.target.value;
  }
  render() {
    let errStyle = {visibility:this.props.error};
    return (
      <div id="Signup">
        <div id="SignupForm">
          <label>
            <input type="tel" name="phone" placeholder="Phone Number" value={this.number} onChange={this.handleNumberChange} minLength="10" maxLength="10" />
          </label>
          <pre />
          <label>
            <input type="password" name="password" placeholder="Password" value={this.pw} onChange={this.handlePwChange} />
          </label>
          <pre />
          <input className="signInButton" type="submit" value="Register" onClick={()=>this.props.register(this.number, this.pw)} />
        </div>
      </div>
    )
  }
}