import React, { Component } from 'react'
import { render } from 'react-dom'


export default class QueryDetail extends Component {
    constructor(){
        super();
        this.state = {
            queryTitle: 'la housing between $1100 and $1400',
            listings: [
            {title:'GREAT APT VENICE - MUST SEE', url: 'www.craiglist.com/thisHouse1'},
            {title:'GREAT APT MONICA - MUST SEE', url: 'www.craiglist.com/thisHouse2'},
            {title:'GREAT APT DOWNTOWN - MUST SEE', url: 'www.craiglist.com/thisHouse3'},
            {title:'GREAT APT MANHATAN - MUST SEE', url: 'www.craiglist.com/thisHouse4'}        
        ]
    }

    }


  render() {
      console.log('this state ', this.state)
    const renderListings = this.state.listings.map((listing,index) => {
        return (
            <div>
                <h2>title: {listing.title}</h2>
                <h3>listing: {listing.url}</h3>
            </div>
        )
    });
    return (
      <div id="Profile">
        <h1>{this.state.queryTitle}</h1>
        {renderListings}
      </div>
    )
  }
}//app constructor ends

