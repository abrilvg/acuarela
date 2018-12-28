import React from "react";
import "./Login.css";
import { Button, Form, Input, Grid, Message, Icon } from 'semantic-ui-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import CustomField from "../../../Components/Common/CustomField";
import ValidatorHelper from "../../../Components/Common/Validator";
import { Redirect, Link } from "react-router-dom";
import { loginUser } from "../../../Actions/userActions";
import { connect } from 'react-redux';

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

  handleSubmit = (e) => {
    //clear state?
    this.props.loginUser(this.state);
  }

  render() {
    let { loading, user, error } = this.props;

    let errorMessage;

    if (error.data || error.message) {
      errorMessage = (
        <Message icon negative>
          <Icon name='dont' />
          <Message.Content>
              <Message.Header>{error.data? error.data.message: error.message}</Message.Header>
              Please try again
         </Message.Content>
        </Message>
      );
    }

    if (user.isLoggedIn) return <Redirect to='/' />;

    return (
      <div>
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

          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input control={Button}>Submit</Form.Input>
              </Grid.Column>
              <Grid.Column>
                <Link to="/signup">Sign up</Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Form>
        {errorMessage}
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

export default connect(mapStateToProps, {loginUser})(Login);
