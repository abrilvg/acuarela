import React from "react";
import { Grid, Image, Rating, Header } from 'semantic-ui-react';
import "./Acuarela.css";
import PropTypes from 'prop-types';

export default class Picture extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    pathImage: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired
  };
  static defaultProps = {
    name: 'Unknown name',
    author: 'Unknown author',
    pathImage: '',
    rating: 0
  };

  constructor(props) {
    super(props);
    this.state = {
      // qty: props.initialQty,
      // total: 0
    };
  }

  // state = { pictures: data }

  handleItemClick = (e, { name }) => {
    // this.setState({ activeItem: name });
    console.log(e);
  }

  render() {
    return (
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/image.png' /*src={this.props.pathImage}*/ size='medium' />
        <Header size='medium' className="picture-name">{this.props.name}</Header>
        <div className="picture-author">{this.props.author}</div>
        <Grid.Row>
          <Rating icon='star' defaultRating={3} maxRating={4} />&nbsp;({this.props.rating})
        </Grid.Row>
      </Grid.Column>
    );
  }
}
