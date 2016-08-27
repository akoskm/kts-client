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

    this.state = {
      tilesData: this.props.tilesData
    };
  }

  render() {
    const tilesData = this.state.tilesData;

    return (
      <GridList
        cellHeight={styles.gridList.cellHeight}
        style={styles.gridList}
      >
        {tilesData.map((tile, i) => {
          const link = '/page/' + tile.page;
          return (
            <Link to={link}>
              <PhotoTile
                key={i}
                tile={tile}
                style={styles.gridList.cellImg}
              />
            </Link>
          );
        })}
      </GridList>
    );
  }
}

PhotoGrid.contextTypes = {
  router: React.PropTypes.func.isRequired
};

PhotoGrid.propTypes = {
  tilesData: React.PropTypes.array.isRequired
};

export default PhotoGrid;