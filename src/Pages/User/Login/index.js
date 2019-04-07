import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form, Input, Grid, Message, Icon, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';

import CustomField from "../../../Components/Common/CustomField";
import { loginUser } from "../../../Actions/userActions";
import ValidatorHelper from "../../../Components/Common/Validator";

import "./Login.css";
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

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

  isSubmitEnabled = () => {
    return ValidatorHelper.notEmptyText().isValid(this.state.email) &&
      ValidatorHelper.matchEmail().isValid(this.state.email) &&
      ValidatorHelper.notEmptyText().isValid(this.state.password) &&
      ValidatorHelper.minLength(8).isValid(this.state.password) &&
      ValidatorHelper.maxLength(15).isValid(this.state.password);
  }

  render() {
    let { loading, user, error } = this.props;

    let errorMessage;

    //TODO is correct put here this validations?
    let isSubmitEnabled = this.isSubmitEnabled();

    if (error.data || error.message) {
      errorMessage = (
        <Message icon negative>
          <Icon name='dont' />
          <Message.Content>
            <Message.Header>{error.data ? error.data.message : error.message}</Message.Header>
            Please try again
         </Message.Content>
        </Message>
      );
    }

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

              <CustomField
                name='email'
                label='Email:'
                control={Input}
                placeholder='e.g. joe@schmoe.com'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.matchEmail()]}
                onChange={this.handleChange}
                required={true}
              />

              <CustomField
                name='password'
                label='Password:'
                type='password'
                placeholder='Enter password'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(15), ValidatorHelper.minLength(8)]}
                onChange={this.handleChange}
                required={true}
              />

              <div>
                <Button control={Button} primary disabled={!isSubmitEnabled}>Login</Button>
                <Link to="/signup">Sign up</Link>
              </div>

            </Form>
            {errorMessage}

          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userStore.user,
    error: state.userStore.error,
    loading: state.userStore.loading
  }
}

export default connect(mapStateToProps, { loginUser })(Login);
