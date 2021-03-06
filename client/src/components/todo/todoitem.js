import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class TodoItem extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			userId: this.props.match.params.userId,
			todoId: this.props.match.params.todoId,
			todoItemId: 0,
			content: '',
		}
	}

	createTodoItem = async () => {
		const { userId, todoId } = this.state;
		// console.log("userId: " + userId);
		const response = await fetch(`/users/${userId}/todos/${todoId}/items`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: this.state.content,
			})
		});
		const body = await response.json();
	
		if (response.status !== 200 && response.status !== 201) {
		  throw Error(body.message) 
		}
		return body;
	};
	
	updateTodoItem = async () => {
		const { userId, todoId, todoItemId} = this.state;
		// console.log("userId: " + userId);
		const response = await fetch(`/users/${userId}/todos/${todoId}/items/${todoItemId}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: this.state.content,
			})
		});
		const body = await response.json();
	
		if (response.status !== 200 && response.status !== 201) {
		  throw Error(body.message) 
		}
		return body;
	};

	render() {
		const { userId, todoId, todoItemId } = this.state;
		var { content } = this.state;
		return (
			<div>
				<Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/home">
					[Home]
				</Link>
				<br />
				User ID: {userId}
				<br />
				TODO ID: {todoId}
				<br />
				Content of TODO: <input
					value={content}
					onChange={e => {
						this.setState({ content: e.target.value })
					}}
					type="text"
					placeholder="content"
				/>
				<br />
				<button onClick={() => 
                  this.createTodoItem()
                      .then(res => {
                        // this.setState({ title: res.express })
						console.log("res: " + res)
                      })
					  .catch(err => console.log(err))
				}>Create TODO item</button>
				<br />
				TODO Item ID: <input
					value={todoItemId}
					onChange={e => {
						this.setState({ todoItemId: e.target.value })
					}}
					type="text"
					placeholder="todoItemId"
				/>
				<br />
				Updated content: <input
					value={content}
					onChange={e => {
						this.setState({ content: e.target.value })
					}}
					type="text"
					placeholder="content"
				/>
				<Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} 
					  to={`/users/${userId}/todos/${todoId}/${todoItemId}`}>
					<button onClick={() => 
						this.updateTodoItem()
							.then(res => {
								// this.setState({ title: res.express })
								console.log("res: " + res)
							})
							.catch(err => console.log(err))
					}>Update a TODO item</button>
				</Link>
			</div>
		)
	}
} 
export default TodoItem;