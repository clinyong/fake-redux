const thunk = require("../");

describe("redux thunk middleware", () => {
  const doDispatch = () => {};
  const doGetState = () => {};
  const nextHandler = thunk({ dispatch: doDispatch, getState: doGetState });

  test("must return value as expected if a function", () => {
    const expected = "rocks";
    const actionHandler = nextHandler();

    expect(actionHandler(() => expected)).toBe(expected);
  });

  test("must return the return value of next if not a function", () => {
    const expected = "rocks";
    const actionHandler = nextHandler(() => expected);

    expect(actionHandler()).toBe(expected);
  });
});
