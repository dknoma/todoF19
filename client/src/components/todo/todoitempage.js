import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class TodoItemPage extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			userId: this.props.match.params.userId,
			todoId: this.props.match.params.todoId,
			todoItemId: this.props.match.params.todoItemId,
			title: '',
			content: '',
			displayContent: '',
		}
	}

	componentDidMount() {
		// Call our fetch function below once the component mounts
		this.getTodo()
			.then(res => {
				console.log("res: " + res.title)
				this.setState({ title: res.title })
			})
			.catch(err => console.log(err));
		this.getTodoItem()
			.then(res => {
				console.log("res: " + res.content)
				this.setState({ displayContent: res.content })
			})
			.catch(err => console.log(err));
	}

	getTodo = async () => {
		const { userId, todoId } = this.state;
		const response = await fetch(`/users/${userId}/todos/${todoId}`);
		const body = await response.json();
		console.log("getTodo: " + body.title)
		console.log("response.status: " + response.status)
	
		if (response.status !== 201 && response.status !== 200) {
		  throw Error(body.message) 
		}
		return body;
	}

	getTodoItem = async () => {
		const { userId, todoId, todoItemId } = this.state;
		const response = await fetch(`/users/${userId}/todos/${todoId}/items/${todoItemId}`);
		const body = await response.json();
		console.log("getTodoItem: " + body.content)
		console.log("response.status: " + response.status)
	
		if (response.status !== 201 && response.status !== 200) {
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
		const { userId, todoId, todoItemId } = this.state;
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

	render() {
		const { userId, todoId, todoItemId, title, displayContent } = this.state;
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
				Content : {displayContent}
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
export default TodoItemPage;