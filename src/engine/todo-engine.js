const Engine = require('../../lib/engine');

const events = {
  INIT:'init',
  CREATE_TODO: 'createTodo'
};

const constants = {
  status: {
    TODO: 'TODO',
    DONE: 'DONE'
  }
};

/**
 * Encapsulates all todo business logic and state
 */
class TodoEngine extends Engine {
  constructor() {
    super();
    this.events = events;
    this.constants = constants;
    this.todoList = [];
  }

  init() {
    this.emit(this.events.INIT, {});
  }

  createTodo({text}) {
    if (!text) {
      this.emitError(this.events.CREATE_TODO, {message: 'Text must be non-empty'});
      return;
    }
    let todo = {text: text, status: this.constants.status.TODO};
    this.todoList.push(todo);
    this.emit(this.events.CREATE_TODO, {todo});
  }

  getTodoList() {
    return this.todoList;
  }
}

module.exports = TodoEngine;