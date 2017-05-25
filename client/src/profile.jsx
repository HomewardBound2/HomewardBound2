import React, { Component } from 'react'
import { render } from 'react-dom'
import QueryDetail from './queryDetail.jsx'
const axios = require('axios');

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipient: null
    };
    let minPrice = null;
    let maxPrice = null;
    let searchString = null;
    let newQueries = null;
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handlePhoneNumber = this.handlePhoneNumber.bind(this);
  }

  componentDidMount() {
    console.log('in component did mount')
    axios.get(`profile/`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          queryList: response.data
        });
      });
  }

  handleMinChange(event) {
    this.minPrice = event.target.value;
  }
  handleMaxChange(event) {
    this.maxPrice = event.target.value;
  }
  handleSearchChange(event) {
    this.searchString = event.target.value;
  }
  handlePhoneNumber(event) {
    this.state.recipient = event.target.value;
  }

  // newQueries = this.props.userQueries.map((curr, i) => {
  //   curr.maxPrice + curr.minPrice + curr.searchString
  // })

  sendSms(recipient) {
    let string;
    console.log('sendSMMMMSSSSSS',this.props.userQueries) //array of objects 
    for (let i=0; i<this.props.userQueries.length; i++){
      console.log('22222', this.props.userQueries[1])
      for (let key in this.props.userQueries[i]){
        if (key !== '_id'){
        console.log('33333', key)
        string += this.props.userQueries[i][key]+'\n'
        console.log('strrriiinnnggggg!!', string)
        }
      }
    }
    axios
      .post('/sendsms', {recipient: this.state.recipient, data: string})
      .then((response) => {
        this.setState({recipient: this.state.recipient})
      })
  }

  render() {
    console.log(this.props)
    let newObj = this.props.userQueries.map((curr, i) => {
      return (
        <div>
          <a onClick= {() => this.props.getResults(curr._id)} href = "#" >This is the Max Price -->{curr.maxPrice}  This is the Min Price -->{curr.minPrice}  Under the search term -->{curr.searchString}</a>
        </div>
      )
    })

    return (
      <div id="Profile">
        <div id="userID">
          <h2> {this.props.number}</h2>
        </div>
        <div className="query">
          <h3> Your Queries:</h3>
        </div>
        {newObj}
        <input name="min" placeholder="Min price" value={this.min} onChange={this.handleMinChange} />
        <br />
        <input name="max" placeholder="Max price" value={this.max} onChange={this.handleMaxChange} />
        <br />
        <input name="search" placeholder="Search by..." value={this.search} onChange={this.handleSearchChange} />
        <br />

        <button onClick={()=> this.props.query(this.minPrice, this.maxPrice, this.searchString)}>Create New Query</button>
        <br />
        <p>Enter your phone number to send SMS to :</p>
        <input name="phoneNumber" placeholder="+12223334444" value={this.state.recipient} onChange={this.handlePhoneNumber}/>
        <button onClick={()=>this.sendSms(this.state.recipient)}>SendSMS</button>
        <button onClick={() => this.props.query(this.minPrice, this.maxPrice, this.searchString)}>Create New Query</button>
      </div>
    )
  }
}
