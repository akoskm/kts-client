import React from 'react';
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

const PhotoGrid = (props) =>
  <GridList
    cellHeight={styles.gridList.cellHeight}
    style={styles.gridList}
  >
    {props.tilesData.map((tile, i) => {
      const link = '/page/' + tile.page;
      return (
        <Link key={i} to={link}>
          <PhotoTile
            key={i}
            tile={tile}
            style={styles.gridList.cellImg}
          />
        </Link>
      );
    })}
  </GridList>;

PhotoGrid.propTypes = {
  tilesData: React.PropTypes.array.isRequired
};

export default PhotoGrid;
