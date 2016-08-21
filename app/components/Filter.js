import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class FilterComponent extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event, index, value) {
    this.props.handleChange(this.props.filter.queryParam, value);
  }

  render() {
    let filter = this.props.filter;
    let filterValues = filter.values.map((f, index) => {
      return (<MenuItem key={index} value={f.value} primaryText={f.label} />);
    });
    return (
      <div>
        <span>{filter.label}</span>
        <DropDownMenu value={this.props.value} onChange={this.onChange}>
          {filterValues}
        </DropDownMenu>
      </div>
    );
  }
}

FilterComponent.protoTypes = {
  handleChange: React.PropTypes.func.isRequired
};

export default FilterComponent;
