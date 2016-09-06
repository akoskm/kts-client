import React from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class PhotoTileComponent extends React.Component {

  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    this.props.onClick(this.props.tile);
  }

  render() {
    const tile = this.props.tile;
    return (
      <GridTile
        key={tile.key}
        title={tile.title}
        subtitle={tile.author}
        onClick={this.handleOnClick}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
      >
        <img role="presentation" src={tile.img} style={this.props.style} />
      </GridTile>
    );
  }
}

PhotoTileComponent.propTypes = {
  tile: React.PropTypes.object.isRequired,
  style: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default PhotoTileComponent;
