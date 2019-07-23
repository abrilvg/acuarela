import { connect } from 'react-redux';
import { Grid, Image, Rating, Header, Button, Segment } from 'semantic-ui-react';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { getAcuarelaDetails } from '../../../actions/acuarelaActions';

// import './acuarela.css';

class AcuarelaDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getAcuarelaDetails(this.props.match.params.id);
  }

  handleGoBack = () => {
    this.props.history.push('/');
  }

  handleEdit = () => {
    console.log('edit acuarela');
  }

  handleDelete = () => {
    console.log('delete acuarela');
  }

  render() {
    const { name, createdDate, technique, material, country, rating, images } = this.props.acuarela;

    return (
      <Segment style={{ minHeight: 500, padding: '50px' }}>
        <Grid columns={2}>
          <Grid.Row>
            <Button onClick={this.handleGoBack}>Back</Button>
          </Grid.Row>
          <Grid.Column>
            {/* TODO just for now we are going to show first picture */}
            <Image src={images? images[0].url: ''} size='medium' />
          </Grid.Column>
          <Grid.Column>
            <Header size='medium'>{name}</Header>
            {/* <Rating icon='star' defaultRating={rating? rating: 0} maxRating={4} /> */}
            <br /> {createdDate}
            <br /> {technique}
            <br /> {material}
            <br /> {country}
          </Grid.Column>
          <Grid.Row>
            <Button onClick={this.handleEdit}>Edit</Button>
            <Button onClick={this.handleDelete}>Delete</Button>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  acuarela: state.acuarelaStore.acuarela,
  loading: state.acuarelaStore.loading
})

const mapDispatchToProps = dispatch => ({
  getAcuarelaDetails: (acuarelaId) => getAcuarelaDetails(dispatch, acuarelaId)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AcuarelaDetail));
