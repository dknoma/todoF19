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
	complete(req, res) {
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
					.update({
						complete: req.body.complete,
					})
					.then(() => res.status(200).send(todoItem))  // Send back the updated todoItem.
					.catch((error) => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	}
};