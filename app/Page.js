import React from 'react';

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return '<span>{this.props.nameslug}</span>';
  }
}

export default Page;
