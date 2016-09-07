import React from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const PhotoTileComponent = (props) =>
  <GridTile
    title={props.tile.title}
    subtitle={props.tile.author}
    actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
  >
    <img role="presentation" src={props.tile.img} style={props.style} />
  </GridTile>;

PhotoTileComponent.propTypes = {
  tile: React.PropTypes.object.isRequired,
  style: React.PropTypes.object.isRequired
};

export default PhotoTileComponent;
