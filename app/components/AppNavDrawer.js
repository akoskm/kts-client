import React from 'react';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { spacing, typography, zIndex } from 'material-ui/styles';
import { cyan500 } from 'material-ui/styles/colors';

import Filters from './Filters';
import Filter from './Filter';

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
  filter: {
    padding: 16
  }
};

class AppNavDrawer extends React.Component {

  constructor(props) {
    super(props);

    this.handleTouchTapHeader = this.handleTouchTapHeader.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      filterValues: {}
    };
  }

  handleTouchTapHeader() {
    // this.context.router.push('/');
    this.props.onRequestChangeNavDrawer(false);
  }

  handleChange(key, value) {
    const newFilterValues = this.state.filterValues;
    newFilterValues[key] = value;
    this.setState({
      filterValues: newFilterValues
    });
    this.props.onHandleChangeFilter(newFilterValues);
  }

  render() {
    const {
      docked,
      onRequestChangeNavDrawer,
      open,
      style
    } = this.props;

    const filterMenu = Filters.map((filter, index) => {
      const currentValue = this.state.filterValues[filter.queryParam];
      return (
        <Filter
          key={index}
          filter={filter}
          value={currentValue}
          handleChange={this.handleChange}
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
        <div style={styles.filter}>
          {filterMenu}
        </div>
        <Divider />
        <SelectableList>
          <Subheader>Resources</Subheader>
          <ListItem primaryText="Contact" value="https://github.com/callemall/material-ui" />
        </SelectableList>
      </Drawer>
    );
  }
}

AppNavDrawer.propTypes = {
  docked: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired,
  onRequestChangeNavDrawer: React.PropTypes.func.isRequired,
  onHandleChangeFilter: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  style: React.PropTypes.object
};

AppNavDrawer.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  router: React.PropTypes.object.isRequired
};

export default AppNavDrawer;
