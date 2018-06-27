const React = require("react");
const { storeKey, storeShape } = require("../constant");

module.exports = function connect(mapStateToProps) {
  return function connectHOC(WrappedComponent) {
    class Connect extends React.Component {
      constructor(props, context) {
        super(props, context);

        this.store = props[storeKey] || context[storeKey];
        this.unsubscribe = this.store.subscribe(this.update.bind(this));
        this.state = {
          storeState: this.store.getState()
        };
      }

      update() {
        this.setState({
          storeState: this.store.getState()
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
        this.store = null;
      }

      render() {
        return <WrappedComponent {...mapStateToProps(this.state.storeState)} />;
      }
    }

    Connect.contextTypes = {
      [storeKey]: storeShape
    };

    return Connect;
  };
};
