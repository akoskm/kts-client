import React from 'react';
import AppBar from 'material-ui/AppBar';

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
    margin: '0px 0px 0px -8px'
  }
};

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let nameslug = '';
    if (this.props.routeParams) {
      nameslug = this.props.routeParams.nameslug;
    }
    return (
      <div>
        <AppBar
            title={nameslug}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            style={styles.appBar}
          />
      </div>
    );
  }
}

Page.propTypes = {
  routeParams: React.PropTypes.object.isRequired
};

export default Page;
