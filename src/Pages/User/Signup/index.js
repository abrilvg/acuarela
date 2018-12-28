import React from "react";
import "./Signup.css";
import { Button, Form, Input, Select, TextArea, Grid} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import CustomField from "../../../Components/Common/CustomField";
import ValidatorHelper from "../../../Components/Common/Validator";
import { createUser } from "../../../Actions/userActions";
import { Redirect, Link } from "react-router-dom";
import { Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

const countryOptions = [
  { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  { key: 'bo', value: 'bo', flag: 'bo', text: 'Bolivia' },
  { key: 'cl', value: 'cl', flag: 'cl', text: 'Chile' },
  { key: 'cn', value: 'cn', flag: 'cn', text: 'China' },
  { key: 'co', value: 'co', flag: 'co', text: 'Colombia' },
  { key: 'it', value: 'it', flag: 'it', text: 'Italy' },
  { key: 'jp', value: 'jp', flag: 'jp', text: 'Japan' },
  { key: 'us', value: 'us', flag: 'us', text: 'United States' }
];

class Signup extends React.Component {

  state = {
    name: '',
    userName: '',
    birthDate: null,
    country: countryOptions[0].value,
    phoneNumber: '',
    email: '',
    password: '',
    description: ''
  };

  handleChangeDate = (date) => {
    this.setState({
      birthDate: date
    });
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    }, () => {
      // console.log(this.state);
    });
  };

  handleSubmit = (e) => {
    //clear state?
    this.props.createUser(this.state);
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
            name='name'
            label='Full name:'
            control={Input}
            placeholder='Enter your full name'
            validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(35)]}
            onChange={this.handleChange}
            required={true}
          />

          <CustomField
            name='userName'
            label='User name:'
            control={Input}
            placeholder='Enter user name'
            validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(35)]}
            onChange={this.handleChange}
            required={true}
          />

          <SemanticDatepicker label="Birth date"
            onDateChange={this.handleChangeDate}
            required
          />

          <CustomField
            name='country'
            label='Select your contry:'
            control={Select}
            placeholder=''
            validators={[ValidatorHelper.notEmptyText()]}
            onChange={this.handleChange}
            required={true}
            options={countryOptions}
          />

          <CustomField
            name='phoneNumber'
            label='Phone number:'
            control={Input}
            placeholder='Enter phone number'
            validators={[ValidatorHelper.matchPhoneNumber()]}
            onChange={this.handleChange}
            required={false}
          />

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

          <CustomField
            name='description'
            label='Description:'
            control={TextArea}
            placeholder='Write a litlte description about you'
            validators={[ValidatorHelper.maxLength(300)]}
            onChange={this.handleChange}
            required={false}
          />

          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Input control={Button}>Submit</Form.Input>
              </Grid.Column>
              <Grid.Column>
                <Link to="/login">Cancel</Link>
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

export default connect(mapStateToProps, {createUser})(Signup);
