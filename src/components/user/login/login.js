import { Button, Form, Grid, Header, Image, Message, Segment, Icon, Input } from 'semantic-ui-react';

import { connect } from 'react-redux';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import CustomTextInput from '../../common/customTextInput/customTextInput';
import { loginUser } from '../../../actions/userActions';
import ValidatorHelper from '../../common/validator/validator';

import './login.css';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    this.props.loginUser(this.state);
  }

  get isSubmitEnabled () {
    const validators = [
      ValidatorHelper.notEmptyText().isValid(this.state.email),
      ValidatorHelper.matchEmail().isValid(this.state.email),
      ValidatorHelper.notEmptyText().isValid(this.state.password),
      ValidatorHelper.minLength(8).isValid(this.state.password),
      ValidatorHelper.maxLength(15).isValid(this.state.password)
    ];
    return validators.every(validator => validator === true);
  }

  render() {
    const { loading, user } = this.props;

    if (user.isLoggedIn) return <Redirect to='/' />;

    return (
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' style={{ color: 'white' }} textAlign='center'>
            <Icon.Group size='large'>
              <Icon name='paint brush' />
            </Icon.Group>
            ACUAS
          </Header>
          <Form size='large' loading={loading} onSubmit={this.handleSubmit} error>
            <Segment>
              <CustomTextInput
                name='email'
                control={Input}
                icon='mail'
                placeholder='Email addresss'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.matchEmail()]}
                onChange={this.handleChange}
                required={true}
              />

              <CustomTextInput
                name='password'
                control={Input}
                type='password'
                icon='lock'
                placeholder='Password'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(15), ValidatorHelper.minLength(8)]}
                onChange={this.handleChange}
                required={true}
              />
              <Button primary disabled={!this.isSubmitEnabled} color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to='/signup'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  loading: state.userStore.loading
})

const mapDispatchToProps = dispatch => ({
  loginUser: (userData) => loginUser(dispatch, userData)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
