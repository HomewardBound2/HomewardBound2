import React, { Component } from 'react'
import { render } from 'react-dom'
import Login from './login.jsx'
import Preferences from './preferences.jsx'
import Profile from './profile.jsx'
import QueryDetail from './queryDetail.jsx'
import Signup from './signup.jsx'
import Results from './results.jsx'

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
    this.redirectToRegister = this.redirectToRegister.bind(this)
    this.logInUser = this.logInUser.bind(this)
    this.createQuery = this.createQuery.bind(this)
    this.getResults = this.getResults.bind(this)
  }

  registerUser(number, pw) {
    console.log('phone', number, 'password', pw)
    axios
      .post("/api/users/register", {
        phoneNumber: number,
        password: pw
      })
      .then(function(result) {
        if (result.data) {
          //update state (loggedIn) and route to preferences
          let newState = Object.assign({}, this.state, {
            loggedIn: "true",
            number: number,
            page: "prof"
          })
          this.setState(newState);
        } else {
          console.log('error')
          //show an error (Error: please retry)
          let newState = Object.assign({}, this.state, {
            loginError: 'visible'
          })
          this.setState(newState);
        }
      }.bind(this))
  }

  redirectToRegister() {
    let newState = Object.assign({}, this.state, {
      loggedIn: "true",
      page: "reg"
    })
    this.setState(newState)
  }

  logInUser(number, pw) {
    console.log('this', number, pw)
    axios
      .post("/api/users/login", {
        phoneNumber: number,
        password: pw
      })
      .then(function(result) {
        console.log('result data:', result)
        if (result.data) {
          let newState = Object.assign({}, this.state, {
            loggedIn: "true",
            number: number,
            page: "prof",
            userQueries: result.data.resultsArr,
            userId: result.data.userId
          })
          this.setState(newState);
          console.log('this is the state', this.state)
        } else {
          //show an error (Error: please retry)
          let newState = Object.assign({}, this.state, {
            loginError: 'visible'
          })
          this.setState(newState);
        }
      }.bind(this))
  }

  createQuery(minPrice, maxPrice, searchString) {
    console.log('Im in createQuery request', minPrice, maxPrice, searchString, this.state.userId)
    axios
      .post("/api/queries/" + this.state.userId, {
        minPrice,
        maxPrice,
        searchString
      })
      .then(function(result) {
        if (result.data) {
          let newState = Object.assign({}, this.state, {
            loggedIn: "true",
            number: number,
            page: "pref"
          })
          this.setState(newState);
        } else {
          //show an error (Error: please retry)
          let newState = Object.assign({}, this.state, {
            loginError: 'visible'
          })
          this.setState(newState);
        }
      }.bind(this))
  }

  getResults(qId) {
    console.log('this is the qid ', qId)

    axios
      .get("/api/queries/" + this.state.userId + '/' + qId)
      .then(function(result) {
        if (result.data) {
          let newState = Object.assign({}, this.state, {
            listings: result.data,
            page: "results"
          })
          this.setState(newState);
          console.log('this is the new state lmao ', this.state)
        } else {
          //show an error (Error: please retry)
          let newState = Object.assign({}, this.state, {
            loginError: 'visible'
          })
          this.setState(newState);
        }
      }.bind(this))
  }


  render() {
    let pageToRender;
    if (this.state.loggedIn && this.state.page === "prof") {
      console.log('1');
      pageToRender = <Profile number={this.state.number} userQueries={this.state.userQueries} query={this.createQuery} getResults={this.getResults} />
    } else if (this.state.loggedIn && this.state.page === "reg") {
      console.log('3');
      pageToRender = <Signup register={this.registerUser.bind(this)} umber={this.state.number} />
    } else if (this.state.loggedIn && this.state.page === "pref") {
      console.log('2');
      pageToRender = <Preferences query={this.createQuery} />
    } else if (this.state.loggedIn && this.state.page === "results") {
      console.log('4');
      pageToRender = <Results listings = {this.state.listings} />
    } else {
      console.log(this.state);
      pageToRender = <Login error={this.state.loginError} register={this.registerUser.bind(this)} login={this.logInUser.bind(this)} redirectToRegister={this.redirectToRegister.bind(this)} />
    }
    return (
      <div id="App">
        {pageToRender}
      </div>
    )
  }
}
//app constructor ends


render(<App />, document.getElementById('content'));
