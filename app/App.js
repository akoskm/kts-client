import React, { Component } from 'react';
import { GridList } from 'material-ui/GridList';

import PhotoTile from './components/PhotoTile';

const styles = {
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

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleTileClick = this.handleTileClick.bind(this);

    this.state = {
      tilesData: this.props.tilesData
    };
  }

  handleTileClick(tile) {
    this.context.router.push('/page/' + tile.page);
  }

  render() {
    const tilesData = this.state.tilesData;

    return (
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
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

App.propTypes = {
  tilesData: React.PropTypes.object.isRequired
};

export default App;
