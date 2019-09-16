const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const User = require('../models').User;

module.exports = {
	create(req, res) {
		return User
			.findByPk(req.params.userId)
			.then(user => {
				return Todo
					.create({
						title: req.body.title,
						userId: req.params.userId
					})
					.then(todo => res.status(201).send(todo))
					.catch(error => {
						console.log("ERROR");
						res.status(400).send(error)
					});
			})
			.catch(error => res.status(400).send(error));
	},
	list(req, res) {
		return User
			.findByPk(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(400).send({
						message: "400 - User not found :("
					})
				}

				return Todo
					.findAll({
						where: {
							userId: req.params.userId
						},
						include: [
							{
								model: TodoItem,
								as: 'todoItems',
							}
						]
					})
					.then(todos => res.status(200).send(todos))
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	},
	retrieve(req, res) {
		return User
			.findByPk(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(400).send({
						message: "400 - User not found :("
					})
				}

				return Todo
					.findByPk(req.params.todoId, {
						include: [
							{
								model: TodoItem,
								as: 'todoItems',
							}
						],
					})
					.then(todo => {
						if (!todo) {
							return res.status(404).send({
								message: 'Todo Not Found',
							});
						}
						return res.status(200).send(todo);
					})
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error))
	},
	update(req, res) {
		return User
			.findByPk(req.params.userId)
			.then(user => {
				return Todo
					.findByPk(req.params.todoId, {
						include: [{
							model: TodoItem,
							as: 'todoItems',
						}],
					})
					.then(todo => {
						if (!todo) {
							return res.status(404).send({
								message: 'Todo Not Found',
							});
						}
						return todo
							.update({
								title: req.body.title || todo.title,	// if new title exists, update to that, else use old
							})
							.then(() => res.status(200).send(todo))  // Send back the updated todo.
							.catch((error) => res.status(400).send(error));
					})
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},
	destroy(req, res) {
		return User
			.findByPk(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(400).send({
						message: "400 - User not found :("
					})
				}

				return Todo
					.findByPk(req.params.todoId)
					.then(todo => {
						if(!todo) {
							return res.status(404).send({
								message: 'Todo not found :('
							})
						}
						return todo
							.destroy()
							.then(() => res.status(200).send({ message: 'Todo deleted successfully.' }))
							.catch(error => res.status(400).send(error));
					})
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	}
};