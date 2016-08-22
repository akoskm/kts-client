import React from 'react';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return this.props.children;
  }
}

AppComponent.propTypes = {
  children: React.PropTypes.object.isRequired
};

AppComponent.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default AppComponent;
