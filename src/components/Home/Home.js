import React, { Component } from "react";
// import { placeholder } from "@babel/types";
import search from "../../media/search.svg";
import axios from "axios";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      input: "",
      toggle: false
    };
  }
// Search results for Input
  handleInput = val => {
    this.setState({
      input: val
    });
    axios.get(`/schools?query=${this.state.input}`).then(response => {
      console.log(response.data)
      this.setState({
        schools: response.data
      });
    });
  };
  
  render() {
    return (
      <div>
        <div className="searchSet">
          <input placeholder={"Type a School Name"} type= 'text' value = {this.state.input} onChange = {e => this.handleInput(e.target.value)} />
          <button title="Submit" type="submit">
            <img src={search} alt = 'icon' />
          </button>
        </div>
        <div className={` ${this.state.input.length ? "show" : "close"}`}>
          {this.state.schools.length ? (
            this.state.schools.map(school => { 
              return(
              <div className = 'school'>
                <h1>{school.name}</h1>
                <h2>{school.rating || 'No rating'}</h2>
               </div>
              )
            })
          ) : (
              <div>
                <h2>No results :(</h2>
              </div>
          )}
        </div>
      </div>
    );
  }
}

export default Home;
