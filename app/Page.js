import React from 'react';
import request from 'superagent';
import AppBar from 'material-ui/AppBar';
import typography from 'material-ui/styles/typography';

const styles = {
  appBar: {
    position: 'fixed',
    top: 0,
    margin: '0px 0px 0px -8px'
  }
};

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const nameslug = this.props.routeParams.nameslug;
    if (nameslug) {
      const url = 'http://localhost:3000/api/pages/' + nameslug;
      this.request = request
        .get(url)
        .set('Accept', 'application/json')
        .end((err, res) => {
          const body = res.body;
          if (!body.success) {
            alert('error communicating with the server');
          } else {
            this.setState({
              page: body.result
            });
          }
        });
    }
  }

  componentWillUnmount() {
    if (this.request) {
      this.request.abort();
    }
  }

  render() {
    let nameslug;
    if (!this.state) {
      return (<div />);
    }
    const page = this.state.page;
    if (this.props.routeParams) {
      nameslug = this.props.routeParams.nameslug;
    }
    return (
      <div>
        <AppBar
            title={nameslug}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
            style={styles.appBar}
          />
        <div>
          <h3 style={styles.h1}>{page.address}</h3>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  routeParams: React.PropTypes.object.isRequired
};

export default Page;
