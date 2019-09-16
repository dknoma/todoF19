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

	createTodo = async () => {
		const { userId } = this.state;
		// console.log("userId: " + userId);
		const response = await fetch(`/users/${userId}/todos`, {
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
	
		if (response.status !== 200 || response.status !== 201) {
			throw Error(body.message) 
		}
		return body;
	};

	render() {
		// const userId = parseInt(this.props.match.params.userId);
		var { userId, title, todoId } = this.state;
		return (
			<div>
				<Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/home">
					[Home]
				</Link>
				<br />
				Welcome user {this.state.userId}!
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
                  this.createTodo()
                      .then(res => {
                        // this.setState({ title: res.express })
						console.log("res: " + res)
                      })
					  .catch(err => console.log(err))
				}>Create Todo List</button>
				<br />
				<center>
					TODO ID: <input
						value={todoId}
						onChange={e => {
							this.setState({ todoId: e.target.value })
						}}
						type="text"
						placeholder="TODO ID."
					/>
				</center>
				<Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to={`/users/${userId}/todos/${todoId}`}>
					[Create TODO Item]
				</Link>
				{/* 
				<Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to={`/users/${userId}/todos/`}>
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