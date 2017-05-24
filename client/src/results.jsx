import React, { Component } from 'react'
import { render } from 'react-dom'
const axios = require('axios');


export default class Results extends Component {
  constructor(props) {
    super(props);


  }


  render() {
    console.log('this.props.listings: ', this.props.listings)
    let renderedListing = this.props.listings.map(function(listing, idx) {
      return (<div>
        <ul>
          <li>{listing.date}</li>
          <li>{listing.title}</li>
          <li>{listing.location}</li>
          <li>{listing.price}</li>
          <li>{listing.url}</li>
        </ul>
      </div>)
    })
    return (

      <div>
    {

      renderedListing
      }
    </div>
    )
  }
}
