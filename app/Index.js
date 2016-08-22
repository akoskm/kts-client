import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 70,
    margin: '0px 0px 0px 0px'
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

AppComponent.propTypes = {
  children: React.PropTypes.object.isRequired
};

AppComponent.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default AppComponent;
