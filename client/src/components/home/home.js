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
  
  // componentDidMount() {
  //   // Call our fetch function below once the component mounts
  //   this.callBackendAPI()
  //       .then(res => this.setState({ data: res.express }))
  //       .catch(err => console.log(err));
  // }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

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
        <input
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
        <br />
        { <button onClick={() =>
                  this.callBackendAPI()
                      .then(res => {
                        this.setState({ data: res.express })
                      })
                      .catch(err => console.log(err))
        }>GET</button> }
    
        <p className="App-intro">data: [{this.state.data}]</p>
      </div>
    )
  }
}

export default Home;
