import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
      super(props)
      
      this.state = {
        data: 'data',
        userId: 0,
      }
  }

  render() {
    // const { userId } = this.props.params;
    var { userId, todoId } = this.state;
    return (
      <div>
        <Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/home">
					[Home]
				</Link>
        <br />
        <Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/signup">
					[Sign Up]
				</Link>
        <br />
        User ID: <input
            value={userId}
            onChange={e => {
                this.setState({ userId: e.target.value })
            }}
            type="text"
            placeholder="User ID."
        /><br />
        <Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to={`/users/${userId}/todos`}>
					[Create Todo List]
				</Link>
      </div>
    )
  }
}

export default Home;
