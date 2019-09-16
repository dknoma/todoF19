import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class Todo extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			userId: this.props.match.params.userId,
			title: '',
			todoId: 0,
		}
	}

	callBackendAPI = async () => {
		const userId = this.state.userId;
		// console.log("userId: " + userId);
		const response = await fetch(`/users/${userId}/todos/`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: this.state.title,
			})
		});
		const body = await response.json();
		console.log("message: " + body.message);
	
		if (response.status !== 200) {
		  throw Error(body.message) 
		}
		return body;
	};

	render() {
		// const userId = parseInt(this.props.match.params.userId);
		var { title, todoId } = this.state;
		return (
			<div>
				<Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/home">
					[Home]
				</Link>
				<br />
				Welcome user {this.state.userId}!
				<br />
				<input
					value={todoId}
					onChange={e => {
						this.setState({ todoId: e.target.value })
					}}
					type="text"
					placeholder="TODO ID."
				/>
				<br />
				<input
					value={title}
					onChange={e => {
						this.setState({ title: e.target.value })
					}}
					type="text"
					placeholder="title"
				/>
				<br />
				<button onClick={() => 
                  this.callBackendAPI()
                      .then(res => {
                        this.setState({ title: res.express })
                      })
					  .catch(err => console.log(err))
				}>Create Todo List</button>
				<br />
				{/* <Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to={`/users/${userId}/todos/`}>
					[Create Todo List]
				</Link>
				<br />
				<Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to={`/users/${userId}/todos/${todoId}`}>
					[Create Todo Item]
				</Link>
				<br /> */}
			</div>
		)
	}
} 
export default Todo;