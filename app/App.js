import request from 'superagent';
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList } from 'material-ui/GridList';

import PhotoTile from './components/PhotoTile';
import AppNavDrawer from './components/AppNavDrawer';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 70
  },
  appBar: {
    position: 'fixed',
    top: 0
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '0px 4px 0px 4px'
  },
  gridList: {
    width: '100%',
    cellHeight: 500,
    overflowY: 'auto',
    marginBottom: 24,
    cellImg: {
      height: '100%',
      width: 'auto'
    }
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleTouchTapLeftIconButton = this.handleTouchTapLeftIconButton.bind(this);
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
      navDrawerOpen: false,
      tilesData: []
    };
  }

  componentDidMount() {
    let url = 'http://localhost:3000/api/search?';
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

  handleChangeFilter(filters) {
    const keys = Object.keys(filters);
    if (keys && keys.length > 0) {
      let tagsComponent;
      let url = 'http://localhost:3000/api/search?';
      keys.forEach((k, i) => {
        tagsComponent = 'tags='.concat(filters[k]);
        if (i < keys.length - 1) {
          tagsComponent += '&';
        }
        url += tagsComponent;
      });
      console.log(url);
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

  handleTileClick(tile) {
    this.context.router.push('/page/' + tile.page);
  }

  render() {
    styles.navDrawer = {
      zIndex: styles.appBar.zIndex - 1
    };
    let docked = false;
    const tilesData = this.state.tilesData;
    let navDrawerOpen = this.state.navDrawerOpen;
    const standardActions = (
      <FlatButton
        label='Ok'
        primary
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <AppBar
            title='KTS Client'
            iconClassNameRight='muidocs-icon-navigation-expand-more'
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
          <div style={styles.root}>
            <GridList
              cellHeight={styles.gridList.cellHeight}
              style={styles.gridList}
            >
              {tilesData.map((tile, i) => (
                <PhotoTile
                  key={i}
                  tile={tile}
                  handleTileClick={this.handleTileClick}
                  style={styles.gridList.cellImg}
                />
              ))}
            </GridList>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default App;
