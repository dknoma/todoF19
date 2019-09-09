const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Bustin\' makes me feel good.',
  }));

  /* Todos */
  app.post('/api/users/:userId/todos', todosController.create);	// Create a todo list category
  app.get('/api/users/:userId/todos/:todoId', todosController.retrieve);		// Get a single todo
  app.get('/api/users/:userId/todos', todosController.list);		// Get a list of all current todos
  app.put('/api/users/:userId/todos/:todoId', todosController.update);	// update the title of a todo
  app.delete('/api/users/:userId/todos/:todoId', todosController.destroy);	// delete a todo

  /* Todo Items */
  app.post('/api/users/:userId/todos/:todoId/items', todoItemsController.create);	// Create a todo item for a specified todo
  app.get('/api/users/:userId/todos/:todoId/items/:todoItemId', todoItemsController.retrieve);	// Get a todo item for a specified todo
  app.put('/api/users/:userId/todos/:todoId/items/:todoItemId', todoItemsController.update);	// Update a specified todo item
  app.delete('/api/users/:userId/todos/:todoId/items/:todoItemId', todoItemsController.destroy);	// delete a specified todo

  /* Users */
  app.get('/api/users/', usersController.list);
  app.post('/api/users/signup', usersController.signup);
};