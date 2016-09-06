import React, { Component } from 'react';
import { GridList } from 'material-ui/GridList';
import { Link } from 'react-router';

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

class PhotoGrid extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleOnClick = this.handleOnClick.bind(this);

    this.state = {
      tilesData: this.props.tilesData
    };
  }

  handleOnClick(tile) {
    const path = '/page/' + tile.page;
    this.context.router.replace(path);
    this.props.onClick(tile);
  }

  render() {
    const tilesData = this.state.tilesData;

    return (
      <GridList
        cellHeight={styles.gridList.cellHeight}
        style={styles.gridList}
      >
        {tilesData.map((tile, i) => {
          return (
            <PhotoTile
              key={i}
              tile={tile}
              style={styles.gridList.cellImg}
              onClick={this.handleOnClick}
            />
          );
        })}
      </GridList>
    );
  }
}

PhotoGrid.contextTypes = {
  router: React.PropTypes.object.isRequired
};

PhotoGrid.propTypes = {
  tilesData: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default PhotoGrid;
