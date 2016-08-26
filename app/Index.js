import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { deepOrange500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import request from 'superagent';

import AppNavDrawer from './components/AppNavDrawer';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

const styles = {
  container: {
    paddingTop: 70,
    margin: '0px 0px 0px 0px',
    fontFamily: muiTheme.fontFamily
  },
  appBar: {
    position: 'fixed',
    top: 0,
    margin: '0px 0px 0px -8px'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
};

class AppComponent extends React.Component {

  constructor(props) {
    super(props);

    this.handleTouchTapLeftIconButton = this.handleTouchTapLeftIconButton.bind(this);
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
      navDrawerOpen: false,
      tilesData: [],
      page: null,
      filters: {}
    };
  }

  componentDidMount() {
    const url = 'http://localhost:3000/api/search?';
    this.request = request
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        const body = res.body;
        if (!body.success) {
          alert('error communicating with the server');
        } else {
          this.setState({
            tilesData: this.requestBodyToTilesData(body)
          });
        }
      });
  }

  componentWillUnmount() {
    this.request.abort();
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleTouchTap() {
    this.setState({
      open: true
    });
  }

  handleTouchTapLeftIconButton() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  handleChangeRequestNavDrawer(open) {
    this.setState({
      navDrawerOpen: open
    });
  }

  handleChangeFilter(newFilters) {
    const currentFilters = this.state.filters;
    const filters = Object.assign(currentFilters, newFilters);
    this.state.filters = filters;
    let page = null;
    if (filters.page) {
      page = filters.page;
      delete filters.page;
    }
    const keys = Object.keys(filters);
    let url = 'http://localhost:3000/api/search?';
    if (page) {
      url += 'page=' + page;
    }
    if (keys && keys.length > 0) {
      let tagsComponent = '';
      if (page) {
        tagsComponent = '&';
      }
      keys.forEach((k, i) => {
        tagsComponent += 'tags='.concat(filters[k]);
        if (i < keys.length - 1) {
          tagsComponent += '&';
        }
        url += tagsComponent;
      });
    }
    request
      .get(url)
      .send({ name: 'Manny', species: 'cat' })
      // .set('X-API-Key', 'foobar')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const body = res.body;
        if (!body.success) {
          alert('error communicating with the server');
        } else {
          this.setState({
            tilesData: this.requestBodyToTilesData(body)
          });
        }
      });
  }

  requestBodyToTilesData(body) {
    let tilesData = [];
    if (body.result && body.result.length > 0) {
      tilesData = body.result.map((p) => {
        // TODO this could be done on the server side
        const url = 'http://localhost:3000/static/'.concat(p.page.nameslug)
          .concat('_img/')
          .concat(p.filename);
        return {
          img: url,
          title: p.filename,
          author: p.page.nameslug,
          page: p.page.nameslug
        };
      });
    }
    return tilesData;
  }

  render() {
    styles.navDrawer = {
      zIndex: styles.appBar.zIndex - 1
    };
    const docked = false;
    const navDrawerOpen = this.state.navDrawerOpen;
    const tilesData = this.state.tilesData;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AppBar
            title="KTS Client"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            style={styles.appBar}
          />
          <AppNavDrawer
            style={styles.navDrawer}
            location={location}
            docked={docked}
            onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
            onHandleChangeFilter={this.handleChangeFilter}
            open={navDrawerOpen}
          />
          <div style={styles.root} key={tilesData.length}>
            {this.props.children && React.cloneElement(this.props.children, {
              tilesData: tilesData,
              onHandleChangePage: this.handleChangeFilter
            })}
          </div>
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
