import request from 'superagent';
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import { deepOrange500 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

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

let tilesData = [
  {
    img: 'images/grid-list/00-52-29-429_640.jpg',
    title: 'Breakfast',
    author: 'jill111'
  },
  {
    img: 'images/grid-list/burger-827309_640.jpg',
    title: 'Tasty burger',
    author: 'pashminu'
  },
  {
    img: 'images/grid-list/camera-813814_640.jpg',
    title: 'Camera',
    author: 'Danson67'
  },
  {
    img: 'images/grid-list/morning-819362_640.jpg',
    title: 'Morning',
    author: 'fancycrave1'
  },
  {
    img: 'images/grid-list/hats-829509_640.jpg',
    title: 'Hats',
    author: 'Hans'
  },
  {
    img: 'images/grid-list/honey-823614_640.jpg',
    title: 'Honey',
    author: 'fancycravel'
  },
  {
    img: 'images/grid-list/vegetables-790022_640.jpg',
    title: 'Vegetables',
    author: 'jill111'
  },
  {
    img: 'images/grid-list/water-plant-821293_640.jpg',
    title: 'Water plant',
    author: 'BkrmadtyaKarki'
  }
];

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleTouchTapLeftIconButton = this.handleTouchTapLeftIconButton.bind(this);
    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
      navDrawerOpen: false,
      tilesData
    };
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
            console.log(body.result);
            if (body.result && body.result.length > 0) {
              tilesData = body.result.map((p) => {
                // TODO this could be done on the server side
                const url = 'http://localhost:3000/static/'.concat(p.page.nameslug)
                  .concat('_img/')
                  .concat(p.filename);
                return {
                  img: url,
                  title: p.filename,
                  author: p._d
                };
              });

              this.setState({
                tilesData
              });
            }
          }
        });
    }
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
              {tilesData.map((tile) => (
                <GridTile
                  key={tile.img}
                  title={tile.title}
                  subtitle={<span>by <b>{tile.author}</b></span>}
                  actionIcon={<IconButton><StarBorder color='white' /></IconButton>}
                >
                  <img role='presentation' src={tile.img} style={styles.gridList.cellImg} />
                </GridTile>
              ))}
            </GridList>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
