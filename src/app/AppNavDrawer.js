import React from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { spacing, typography, zIndex } from 'material-ui/styles';
import { cyan500 } from 'material-ui/styles/colors';

const SelectableList = MakeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 24,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: cyan500,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16
  }
};

class AppNavDrawer extends React.Component {

  constructor(props) {
    super(props);

    this.handleTouchTapHeader = this.handleTouchTapHeader.bind(this);

    this.state = {
      muiVersions: [],
      filterValue: 2
    };
  }

  componentDidMount() {
    const self = this;
    const url = '/versions.json';
    const request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        self.setState({
          muiVersions: JSON.parse(request.responseText),
          version: JSON.parse(request.responseText)[0],
        });
      }
    };

    request.open('GET', url, true);
    request.send();
  }

  firstNonPreReleaseVersion() {
    let version;
    for (let i = 0; i < this.state.muiVersions.length; i++) {
      version = this.state.muiVersions[i];
      // If the version doesn't contain '-' and isn't 'HEAD'
      if (!/-/.test(version) && version !== 'HEAD') {
        break;
      }
    }
    return version;
  }

  handleVersionChange(event, index, value) {
    if (value === this.firstNonPreReleaseVersion()) {
      window.location = 'http://www.material-ui.com/';
    } else {
      window.location = `http://www.material-ui.com/${value}`;
    }
  };

  currentVersion() {
    if (window.location.hostname === 'localhost') return this.state.muiVersions[0];
    if (window.location.pathname === '/') {
      return this.firstNonPreReleaseVersion();
    } else {
      return window.location.pathname.replace(/\//g, '');
    }
  }

  handleRequestChangeLink(event, value) {
    window.location = value;
  }

  handleTouchTapHeader() {
    // this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  }

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      open,
      style
    } = this.props;

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        containerStyle={{ zIndex: zIndex.drawer - 100 }}
      >
        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          Search
        </div>
        <span style={styles.version}>Label</span>
        <DropDownMenu value={this.state.filterValue} onChange={this.handleChange}>
          <MenuItem value={1} primaryText='Never' />
          <MenuItem value={2} primaryText='Every Night' />
          <MenuItem value={3} primaryText='Weeknights' />
          <MenuItem value={4} primaryText='Weekends' />
          <MenuItem value={5} primaryText='Weekly' />
        </DropDownMenu>
        <Divider />
        <SelectableList
          onChange={this.handleRequestChangeLink}
        >
          <Subheader>Resources</Subheader>
          <ListItem primaryText='Contact' value='https://github.com/callemall/material-ui' />
        </SelectableList>
      </Drawer>
    );
  }
}

AppNavDrawer.propTypes = {
  docked: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired,
  onRequestChangeNavDrawer: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  style: React.PropTypes.object
};

AppNavDrawer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};

export default AppNavDrawer;
