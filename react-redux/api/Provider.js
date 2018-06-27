const React = require("react");
const PropTypes = require("prop-types");
const { storeKey, storeShape } = require("../constant");

class Provider extends React.Component {
  getChildContext() {
    return { [storeKey]: this[storeKey] };
  }

  constructor(props, context) {
    super(props, context);
    this[storeKey] = props.store;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.propTypes = {
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired
};

Provider.childContextTypes = {
  [storeKey]: storeShape.isRequired
};

module.exports = Provider;
