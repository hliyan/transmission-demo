const TodoEngine = require('./todo-engine');
const engine = new TodoEngine();
engine.init();

beforeEach(function() {
  engine.removeAllListeners();
});

describe('init', function() {
  it('should emit the init event', function(done) {
    engine.addListener(function(e) {
      expect(e.type).toEqual(engine.events.INIT);
      done();
    });

    engine.init();
  });
});

describe('createTodo', function() {
  it('should emit an error if no text is supplied', function(done) {
    engine.addListener(function(e) {
      expect(e.type).toEqual(engine.events.CREATE_TODO);
      expect(e.error).toEqual({message: 'Text must be non-empty'});
      done();
    });

    engine.createTodo({});
  });

  it('should add new todo and emit event', function(done) {
    engine.addListener(function(e) {
      const expectedTodo = {text: 'foo', status: engine.constants.status.TODO};
      expect(e).toEqual({type: engine.events.CREATE_TODO, data: {todo: expectedTodo}});
      expect(engine.getTodoList()).toEqual([expectedTodo])
      done();
    });

    engine.createTodo({text: 'foo'});
  });
});