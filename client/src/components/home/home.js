import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
      super(props)
      
      this.state = {
      }
  }
  render() {
    return (
      <div>
        <Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/home">
					[Home]
				</Link>
        <br />
        <Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/signup">
					[Sign Up]
				</Link>
      </div>
    )
  }
}

export default Home;
