const TodoItem = require('../models').TodoItem;

module.exports = {
	create(req, res) {
		return TodoItem
			.create({
				content: req.body.content,
				todoId: req.params.todoId,
			})
			.then(todoItem => res.status(201).send(todoItem))
			.catch(error => res.status(400).send(error));
	},
	retrieve(req, res) {
		return TodoItem
			.findOne({
				where: {
					id: req.params.todoItemId,
					todoId: req.params.todoId,
				}
			})
			.then(todoItem => {
				if(!todoItem) {
					return res.status(404).send({
						message: 'TodoItem not found :('
					})
				}
				res.status(201).send(todoItem)
			})
			.catch(error => res.status(400).send(error));
	},
	update(req, res) {
		return TodoItem
			.findOne({
				where: {
					id: req.params.todoItemId,
					todoId: req.params.todoId
				}
			})
			.then(todoItem => {
				if(!todoItem) {
					return res.status(404).send({
						message: 'TodoItem not found :('
					})
				}
				return todoItem
					.update(req.body, { fields: Object.keys(req.body) })
					.then(updatedTodoItem => res.status(200).send(updatedTodoItem))  // Send back the updated todoItem.
					.catch((error) => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	}
};