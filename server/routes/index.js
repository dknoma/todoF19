const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Bustin\' makes me feel good.',
  }));

  app.post('/api/todos', todosController.create);	// Create a todo list category
  app.get('/api/todos/:todoId', todosController.retrieve);		// Get a single todo
  app.get('/api/todos', todosController.list);		// Get a list of all current todos
  app.put('/api/todos/:todoId', todosController.update);	// update the title of a todo
  app.post('/api/todos/:todoId/items', todoItemsController.create);	// Create a todo item for a specified todo
  app.get('/api/todos/:todoId/items/:todoItemId', todoItemsController.retrieve);	// Get a todo item for a specified todo
  app.put('/api/todos/:todoId/items/:todoItemId', todoItemsController.retrieve);	// Update a specified todo
};