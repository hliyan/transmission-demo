const TodoShell = require('./todo-shell');
const shell = new TodoShell();
shell.init({test: true});

beforeEach(function() {
  shell.removeAllListeners();
});

describe('add', function() {
  it('should emit the add event', function(done) {
    shell.addListener(function(e) {
      if ((e.type == shell.events.CREATE_TODO) && (e.data.text === 'hello'))
        done();
    });

    shell.createTodo({text: 'hello'});
  });
});

describe('getTodoList', function() {
  it('should emit the getTodoList event', function(done) {
    shell.addListener(function(e) {
      expect(e.type).toEqual(shell.events.GET_TODO_LIST);
      done();
    });
    shell.getTodoList();
  });
});

describe('showTodoList', function() {
  it('should show the list provided', function() {
    shell.showTodoList({todoList: [{text: 'foo'}, {text: 'bar'}]});
    expect(shell.getLog()).toEqual('foo');
    expect(shell.getLog()).toEqual('bar');
  });
});