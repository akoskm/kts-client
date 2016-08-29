import React from 'react';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const nameslug = this.props.routeParams.nameslug;
    if (nameslug) {
      const url = 'http://localhost:3000/api/pages/' + nameslug;
      this.pageRequest = request
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
    if (this.pageRequest) {
      this.pageRequest.abort();
    }
  }

  render() {
    if (!this.state) {
      return (<div />);
    }
    const page = this.state.page;
    return (
      <Card expanded>
        <CardHeader
          title={page.address}
          subtitle="Subtitle"
          showExpandableButton={false}
        />
        <CardText expandable>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Back" />
        </CardActions>
      </Card>
    );
  }
}

Page.propTypes = {
  routeParams: React.PropTypes.object.isRequired
};

export default Page;
