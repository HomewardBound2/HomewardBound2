import React, { Component } from 'react'
import { render } from 'react-dom'
import Login from './login.jsx'
import Preferences from './preferences.jsx'
import Profile from './profile.jsx'
const axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: "login",
      loggedIn: false,
      number: null,
      loginError: 'hidden'
    };
    this.registerUser = this.registerUser.bind(this)
    this.logInUser = this.logInUser.bind(this)
    this.createQuery = this.createQuery.bind(this)
  }

  registerUser(number, pw) {
    console.log('phone', number, 'password', pw)
    axios
      .post("/register", { phone: number, password: pw })
      .then(function (result) {
        if (result.data) {
          //update state (loggedIn) and route to preferences
          let newState = Object.assign({}, this.state, { loggedIn: "true", number: number, page: "pref" })
          this.setState(newState);
        }
        else {
          console.log('error')
          //show an error (Error: please retry)
          let newState = Object.assign({}, this.state, { loginError: 'visible' })
          this.setState(newState);
        }
      }.bind(this))
  }

  logInUser(number, pw) {
    console.log('this', number, pw)
    axios
      .post("/login", { phone: number, password: pw })
      .then(function (result) {
        if (result.data) {
          let newState = Object.assign({}, this.state, { loggedIn: "true", number: number, page: "prof" })
          this.setState(newState);
        }
        else {
          //show an error (Error: please retry)
          let newState = Object.assign({}, this.state, { loginError: 'visible' })
          this.setState(newState);
        }
      }.bind(this))
  }

    createQuery(city, cat,search,min,max,zip) {
    axios
      .post("/createquery", {city, cat, search, min, max, zip })
      .then(function (result) {
        if (result.data) {
          let newState = Object.assign({}, this.state, { loggedIn: "true", number: number, page: "prof" })
          this.setState(newState);
        }
        else {
          //show an error (Error: please retry)
          let newState = Object.assign({}, this.state, { loginError: 'visible' })
          this.setState(newState);
        }
      }.bind(this))
  }


  render() {
    let pageToRender;
    if (this.state.loggedIn && this.state.page === "prof") { console.log('1'); pageToRender = <Profile number={this.state.number}/> }
    else if (this.state.loggedIn && this.state.page === "pref") { console.log('2'); pageToRender = <Preferences query={this.createQuery}/> }
    else { console.log(this.state); pageToRender = <Login error={this.state.loginError} register={this.registerUser.bind(this)} login={this.logInUser.bind(this)} /> }
    return (
      <div id="App">
        {pageToRender}
      </div>
    )
  }
}
//app constructor ends


render(<App />, document.getElementById('content'));

