import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class TodoItem extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			title: '',
		}
	}
	render() {
		const userId = parseInt(this.props.match.params.userId);
		const todoId = parseInt(this.props.match.params.todoId);
		return (
			<div>
				<Link style={{ margin: `10px`, textDecoration: "none", color: "black" }} to="/home">
					[Home]
				</Link>
				<br />
				User ID: {userId}
				<br />
				TODO ID: {todoId}
			</div>
		)
	}
} 
export default TodoItem;