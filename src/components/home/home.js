import { connect } from 'react-redux';
import React from 'react';
import AcuarelasList from '../acuarelas/acuarelasList/acuarelaList';
import { getAllAcuarelas } from '../../actions/acuarelaActions';

import './home.css';

import {
  Container,
  Grid,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';
import ResponsiveContainer from './responsiveContainer';


class Home extends React.Component {

  componentWillMount = () => {
    this.props.getAllAcuarelas();
  }

  render() {
    return (
      <ResponsiveContainer>
        <Segment
          style={{ minHeight: 700, padding: '1em 0em' }}
        >
          <Container style={{paddingTop:'20px'}}>
            <Header as='h2'>Francisco Tomé</Header>&nbsp;<span>127 results</span>
            <AcuarelasList
              acuarelas={this.props.acuarelas}
              loading={this.props.loading}
            />
          </Container>
        </Segment>
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                    <List.Item as='a'>Religious Ceremonies</List.Item>
                    <List.Item as='a'>Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Banana Pre-Order</List.Item>
                    <List.Item as='a'>DNA FAQ</List.Item>
                    <List.Item as='a'>How To Access</List.Item>
                    <List.Item as='a'>Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>
                    Footer Header
                  </Header>
                  <p>
                    Extra space for a call to action inside the footer that could help re-engage users.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </ResponsiveContainer>
    );
  }
}


const mapStateToProps = state => ({
  acuarelas: state.acuarelaStore.acuarelas,
  loading: state.acuarelaStore.loading,
})

const mapDispatchToProps = dispatch => ({
  getAllAcuarelas: () => getAllAcuarelas(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
