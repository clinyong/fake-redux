// 当 action 是一个函数的时候，是不会执行 next
// 当 action 是一个函数的时候，比如一个 fetch 请求，会在请求完之后再 dispatch 一个成功的 action，这个
// action 一般是一个普通的对象，这时候就会执行 next
module.exports = function thunk({ dispatch, getState }) {
  return next => action => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    return next(action);
  };
};
