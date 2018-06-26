function compose(...funcs) {
  if (funcs.length === 0) {
    return args => args;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

/**
 * @param {Object} reducers
 */
function combineReducers(reducers) {
  const finalReducers = Object.keys(reducers).reduce((obj, k) => {
    const reducer = reducers[k];
    if (typeof reducer === "function") {
      obj[k] = reducer;
    }

    return obj;
  }, {});

  const finalKeys = Object.keys(finalReducers);
  return function combination(state = {}, action) {
    return finalKeys.reduce((nextState, k) => {
      const reducer = finalReducers[k];
      nextState[k] = reducer(state[k], action);
      return nextState;
    }, {});
  };
}

/**
 * @param {Function} reducer
 * @param {Function} enhancer
 */
function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }

  let isDispatching = false;
  let currentState;
  let listeners = [];

  function dispatch(action) {
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }

    try {
      isDispatching = true;
      currentState = reducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    listeners.forEach(listener => listener());

    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  function getState() {
    return currentState;
  }

  return {
    dispatch,
    subscribe,
    getState
  };
}

function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args);

    const chain = middlewares.map(middleware =>
      middleware({
        getState: store.getState
      })
    );

    const dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}

module.exports = {
  combineReducers,
  createStore,
  applyMiddleware
};
