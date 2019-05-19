import { Button, Form, Input, Grid, Message, Icon, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import CustomTextInput from '../../common/customTextInput';
import { loginUser } from '../../../actions/userActions';
import ValidatorHelper from '../../../components/common/validator';

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
    let { loading, user, error } = this.props;

    const errorMessage = (
      <Message icon negative>
        <Icon name='dont' />
        <Message.Content>
          <Message.Header>{error.message}</Message.Header>
          Please try again
        </Message.Content>
      </Message>
    );

    if (user.isLoggedIn) return <Redirect to='/' />;

    return (
      <div>
        <Grid columns={3} container>
          <Grid.Column>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' textAlign='center'>
              <Icon.Group size='large'>
                <Icon name='paint brush' />
              </Icon.Group>
              ACUAS
            </Header>

            <Form loading={loading} onSubmit={this.handleSubmit} error>

              <CustomTextInput
                name='email'
                label='Email:'
                control={Input}
                placeholder='e.g. joe@schmoe.com'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.matchEmail()]}
                onChange={this.handleChange}
                required={true}
              />

              <CustomTextInput
                name='password'
                label='Password:'
                type='password'
                placeholder='Enter password'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(15), ValidatorHelper.minLength(8)]}
                onChange={this.handleChange}
                required={true}
              />

              <div>
                <Button primary disabled={!this.isSubmitEnabled}>Login</Button>
                <Link to='/signup'>Sign up</Link>
              </div>

            </Form>
            {error && errorMessage}

          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  error: state.userStore.error,
  loading: state.userStore.loading
})

const mapDispatchToProps = dispatch => ({
  loginUser: (userData) => loginUser(dispatch, userData)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
