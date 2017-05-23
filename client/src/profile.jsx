import React, { Component } from 'react'
import { render } from 'react-dom'
import QueryDetail from './queryDetail.jsx'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryList: []
    }
  }


  componentDidMount() {
    console.log('in component did mount')
    axios.get(`profile/`)
      .then((response) => {
        console.log(response.data);
        this.setState({queryList: response.data});
      });
  }

  render() {
    console.log(this.props)
      let newObj = this.state.queryList.map((curr, i) => {
       return <QueryDetail queries={curr} key={i} />
    })

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
        <button bsStyle="primary" value="createquery" onClick={this.props.query}>Create New Query</button>
        {newObj}
      </div>
    )
  }
}

