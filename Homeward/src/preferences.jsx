import React, { Component } from 'react'
import { render } from 'react-dom'


export default class Preferences extends Component {
  constructor(props) {
    super(props);
   let city = 'losangeles';
   let cat = 'apa';
   let search='2';
   let min="0";
   let max='9001';
   let zip='90066'
   this.handleMaxChange= this.handleMaxChange.bind(this);
   this.handleMinChange= this.handleMinChange.bind(this);
   this.handleSearchChange= this.handleSearchChange.bind(this);
   this.handleZipChange= this.handleZipChange.bind(this);
  }
 handleSearchChange(event) {
    this.search = event.target.value;
  }
   handleMinChange(event) {
    this.min = event.target.value;
  }
   handleMaxChange(event) {
    this.max = event.target.value;
  }
   handleZipChange(event) {
    this.zip = event.target.value;
  }
  render() {
    return (
      <div id="Preferences">
        <div id="title">
          <h2> Create a Query: </h2>
        </div>
        <form id="prefForm">
        <div id="cityDiv" className="prefIn">City: <input type="text" name="city" value="losangeles" readOnly required/> </div>
        <div id="catDiv" className="prefIn">Category: <input type="text" name="cat" value="Apartments" readOnly required/> </div>
        <div id="zipDiv" className="prefIn">Zip Code: <input type="number" name="zip" placeholder="Zip Code" required onChange={this.handleZipChange}/> </div>
        <div id="minDiv" className="prefIn">Max Price: <input type="number" name="min" placeholder="Min Price" required onChange={this.handleMinChange}/> </div>
        <div id="maxDiv" className="prefIn">Min Price: <input type="number" name="max" placeholder="Max Price" required onChange={this.handleMaxChange}/> </div>
        <div id="bedDiv" className="prefIn">Bedrooms: <input type="number" name="beds" placeholder="Bedrooms" onChange={this.handleSearchChange}/> </div>
        </form>
         <input className="queryButton" type="submit" value="Create Query" onSubmit={()=>this.props.query(this.city,this.cat,this.search,this.min,this.max,this.zip)}/>
      </div>
    )
  }
}//app constructor ends

class Row extends Component {

  render() {
    return (
      <div className="Row" >
        <Box boxID={(this.props.rowLabel * 3) + 1} letter={this.props.letter} onClick={this.props.onClick} />
      </div>
    )
  }
}

class Box extends Component {
  render() {
    let styles = {
      color: "blue",
      height: 100,
      width: 100,
      fontSize: 30
    }
    return (
      <button id={this.props.boxID} style={styles} onClick={this.props.onClick}> TEST
      </button>
    )
  }
}
