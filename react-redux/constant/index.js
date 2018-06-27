const PropTypes = require("prop-types");

const storeKey = "store";
const storeShape = PropTypes.shape({
  subscribe: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired
});

module.exports = {
  storeKey,
  storeShape
};
