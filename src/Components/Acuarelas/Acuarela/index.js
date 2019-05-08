import { Grid, Image, Rating, Header, Icon } from 'semantic-ui-react';
import React from 'react';
import { withRouter } from 'react-router-dom';

import './Acuarela.css';

class Acuarela extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleViewDetail = () => {
    this.props.history.push(`/acuarela-detail/${this.props.id}`);
  }

  render() {
    return (
      <Grid.Column onClick={this.handleViewDetail}>
        <Image src={this.props.pathImage} size='medium' />
        <Header size='medium' className="picture-name">{this.props.name}</Header>
        <div className="picture-author">{this.props.author? `By: ${this.props.author}`: ''}</div>
        {/* <Grid.Row>
          <Rating icon='star' defaultRating={3} maxRating={4} />&nbsp;({this.props.rating})
        </Grid.Row> */}
      </Grid.Column>
    );
  }
}

export default withRouter(Acuarela);
