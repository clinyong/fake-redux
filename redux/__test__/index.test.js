const { createStore, combineReducers } = require("../src");

test("Test redux flow", () => {
  const store = createStore();

  let counter = 0;
  function addCounter() {
    counter++;
  }

  store.subscribe(addCounter);
});
