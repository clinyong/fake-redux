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

module.exports = {
  ADD_TODO,
  DEL_TODO,
  addTodo,
  delTodo,
  todos
};
