import React, { Component } from 'react'
import { render } from 'react-dom'


export default class Profile extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    console.log(this.props)
    return (
      <div id="Profile">
        <div id="userID"><h2> {this.props.number}</h2></div>
        <div className="query">
          <div className="queryInfo">
            <h3> Your Queries:</h3>
            [min]-[max] in [city], [zip] for a [search] bedroom
          </div>
          <div className="queryList">
            {/*{queryResults}*/}
            <ul>
              <li> [title] : [url]</li>
            </ul>
          </div>
        </div>
        <button> Create New Query</button>
      </div>
    )
  }
}//app constructor ends

