const Emitter = require('../../lib/emitter');
const vorpal = require('vorpal');

const events = {
  INIT:'init',
  CREATE_TODO: 'CREATE_TODO',
  GET_TODO_LIST: 'GET_TODO_LIST'
};

const constants = {
};

/**
 * Encapsulates all todo presentation concerns (in this case, a CLI)
 */
class TodoShell extends Emitter {
  /* istanbul ignore next */
  constructor(options) {
    super();
    this.options = {};
    this.events = events;
    this.constants = constants;
    this._cli = vorpal();
    
    this._cli
      .command('add [text]', 'Adds new todo list item')
      .action((args, done) => {
        this.createTodo({text: args.text})
        done();
      });
    this._cli
      .command('list', 'Lists current active todos')
      .action((args, done) => {
        this.getTodoList(); 
        done();
      });
  }

  /* istanbul ignore next */
  init(options) {
    
    if (options) {
      this.options.test = options.test ? true : false;
    }

    if (this.options.test) {
      this._testLog = [];
    } else {
      this._cli.delimiter('todo> ').show();
    }

    this.emit(this.events.INIT, {});
  }

  /* istanbul ignore next */
  show(text) {
    if (this.options.test) {
      this._testLog.push(text);
    } else {
      this._cli.log(text);
    }
  }

  /* istanbul ignore next */
  getLog() {
    return this.options.test ? this._testLog.shift() : null;
  }

  createTodo({text}) {
    this.emit(this.events.CREATE_TODO, {text});
  }

  getTodoList() {
    this.emit(this.events.GET_TODO_LIST);
  }

  showTodoList({todoList}) {
    todoList.forEach(todo => {
      this.show(todo.text);
    });
  }
}

module.exports = TodoShell;