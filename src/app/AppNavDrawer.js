import React from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { spacing, typography, zIndex } from 'material-ui/styles';
import { cyan500 } from 'material-ui/styles/colors';
import Filters from './Filters';
import FilterComponent from './FilterComponent';

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
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      muiVersions: [],
      filterValues: {}
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
          version: JSON.parse(request.responseText)[0]
        });
      }
    };

    request.open('GET', url, true);
    request.send();
  }

  handleTouchTapHeader() {
    // this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  }

  handleChange(key, value) {
    let newFilterValues = this.state.filterValues;
    newFilterValues[key] = value;
    this.setState({
      filterValues: newFilterValues
    });
  }

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      open,
      style
    } = this.props;

    let filterMenu = Filters.map((filter, index) => {
      return (
        <FilterComponent
          key={index}
          filter={filter}
          handleChange={this.handleChange}
          value={this.state.filterValues[filter.queryParam]}
        />
      );
    });

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
        {filterMenu}
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
