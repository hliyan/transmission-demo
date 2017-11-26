const TodoTx = require('./src/app/todo-tx');

// the transmission layer *is* the app
const app = new TodoTx();
app.run();
