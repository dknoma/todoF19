import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class TodoItemsPage extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			userId: this.props.match.params.userId,
			todoId: this.props.match.params.todoId,
			todoItemId: 0,
			title: '',
			content: '',
		}
	}

	componentDidMount() {
		// Call our fetch function below once the component mounts
	  this.getTodo()
		.then(res => this.setState({ title: res.express }))
		.catch(err => console.log(err));
	}

	getTodo = async () => {
		const { userId, todoId } = this.state;
		const response = await fetch(`/users/${userId}/todos/${todoId}`);
		const body = await response.json();
	
		if (response.status !== 200 || response.status !== 201) {
		  throw Error(body.message) 
		}
		return body;
	}

	getTodoItems = async () => {
		const { userId, todoId } = this.state;
		const response = await fetch(`/users/${userId}/todos/${todoId}/items`);
		const body = await response.json();
		console.log("getTodoItems: " + body)
	
		if (response.status !== 200 || response.status !== 201) {
		  throw Error(body.message) 
		}
		return body;
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
	
		if (response.status !== 200 || response.status !== 201) {
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
	
		if (response.status !== 200 || response.status !== 201) {
		  throw Error(body.message) 
		}
		return body;
	};

	displayItems() {

	}

	render() {
		const { userId, todoId, todoItemId, title } = this.state;
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
				TODO: {title}
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
export default TodoItemsPage;