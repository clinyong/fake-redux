const React = require("react");
const { connect, Provider } = require("../");
const { createStore } = require("../../redux/src");
const { todos, addTodo, delTodo } = require("../../fixtures");
const { render, cleanup } = require("react-testing-library");

afterEach(cleanup);

test("react with redux", () => {
  class TodoList extends React.Component {
    render() {
      return (
        <ul data-testid="list">
          {this.props.todos.map(todo => <li key={todo}>{todo}</li>)}
        </ul>
      );
    }
  }

  const Todo = connect(state => ({
    todos: state
  }))(TodoList);

  const store = createStore(todos);

  const App = () => (
    <Provider store={store}>
      <Todo />
    </Provider>
  );

  const { getByTestId } = render(<App />);
  expect(getByTestId("list").childNodes.length).toBe(0);

  store.dispatch(addTodo("First todo."));
  expect(getByTestId("list").childNodes.length).toBe(1);
  expect(getByTestId("list").childNodes[0].textContent).toBe("First todo.");

  store.dispatch(addTodo("Second todo."));
  expect(getByTestId("list").childNodes[1].textContent).toBe("Second todo.");

  store.dispatch(delTodo());
  store.dispatch(delTodo());
  expect(getByTestId("list").childNodes.length).toBe(0);
});
