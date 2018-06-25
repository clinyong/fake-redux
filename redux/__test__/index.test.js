const { createStore, combineReducers } = require("../src");

test("Test basic redux flow", () => {
  // actions

  const ADD_TODO = "ADD_TODO";
  const DEL_TODO = "DEL_TODO";

  function addTodo(text) {
    return {
      type: ADD_TODO,
      text
    };
  }

  function delTodo() {
    return {
      type: DEL_TODO
    };
  }

  // reducers

  function todos(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return state.concat(action.text);
      case DEL_TODO:
        return state.slice(1);
      default:
        return state;
    }
  }

  // store

  const store = createStore(
    combineReducers({
      todos
    })
  );

  let dispatchCounts = 0;
  function addDispatchCounts() {
    dispatchCounts++;
  }

  const unsubscribe = store.subscribe(addDispatchCounts);
  store.dispatch(addTodo("First todo."));
  expect(dispatchCounts).toBe(1);

  store.dispatch(addTodo("Second todo."));
  const [todo1, todo2] = store.getState().todos;
  expect(todo1).toBe("First todo.");
  expect(todo2).toBe("Second todo.");

  store.dispatch(delTodo());
  expect(dispatchCounts).toBe(3);

  unsubscribe();
  store.dispatch(delTodo());
  expect(dispatchCounts).toBe(3);
  expect(store.getState().todos.length).toBe(0);
});
