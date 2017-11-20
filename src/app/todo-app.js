// import the engine and shell as two independent modules
const TodoEngine = require('../engine/todo-engine');
const TodoShell = require('../shell/todo-shell');

/**
 * This is the app -- it connects the business logic of the
 * TodoEngine to the presentation capabilities of the TodoShell
 */
class TodoApp {
  constructor() {
    this.engine = new TodoEngine();
    this.shell = new TodoShell();
    this.shell.addListener(this.onShellEvent.bind(this));
    this.engine.addListener(this.onEngineEvent.bind(this));
  }

  run() {
    this.shell.init();
  }

  // call engine API in response to shell events
  onShellEvent(e) {
    const {engine, shell} = this;

    switch(e.type) {
      case shell.events.INIT:
        engine.init();
      break;
  
      case shell.events.CREATE_TODO:
        engine.createTodo({text: e.data.text});
      break;
  
      case shell.events.GET_TODO_LIST:
        shell.getTodoList({todoList: engine.getTodoList()});
      break;
    }
  }

  // call shell API in response to engine events
  onEngineEvent(e) {
    const {shell, engine} = this;
    switch(e.type) {
      case engine.events.INIT:
        shell.show('Ready');
      break;
  
      case engine.events.CREATE_TODO:
        if (e.error) {
          shell.show('Failed to add todo: ' + e.error.message);
          return;
        }
        shell.showTodoList({todoList: engine.getTodoList()});
      break;
    }    
  }
}

module.exports = TodoApp;