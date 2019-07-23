import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
  Grid,
  Header,
  Message,
  Icon,
  Segment
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DateInput } from 'semantic-ui-calendar-react';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import CustomTextInput from '../../common/customTextInput/customTextInput';
import { createUser } from '../../../actions/userActions';
import ValidatorHelper from '../../common/validator/validator';

import './signup.css';

//where to save this?
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
    birthDate: '',
    country: countryOptions[0].value,
    phoneNumber: '',
    email: '',
    password: '',
    description: ''
  };

  handleChangeDate = (event, {name, value}) => {
    this.setState({
      [name]: value
    });
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleSubmit = () => {
    this.setState( prevState => ({
      birthDate: new Date(prevState.birthDate)
    }), () => {
      this.props.createUser(this.state);
    });
  }

  get isSubmitEnabled () {
    //TODO date valitation is missing
    const validators = [
      ValidatorHelper.notEmptyText().isValid(this.state.name),
      ValidatorHelper.maxLength(35).isValid(this.state.name),
      ValidatorHelper.notEmptyText().isValid(this.state.userName),
      ValidatorHelper.maxLength(35).isValid(this.state.userName),
      ValidatorHelper.notEmptyValue().isValid(this.state.birthDate),
      ValidatorHelper.notEmptyText().isValid(this.state.country),
      ValidatorHelper.matchPhoneNumber().isValid(this.state.phoneNumber),
      ValidatorHelper.notEmptyText().isValid(this.state.email),
      ValidatorHelper.matchEmail().isValid(this.state.email),
      ValidatorHelper.notEmptyText().isValid(this.state.password),
      ValidatorHelper.minLength(8).isValid(this.state.password),
      ValidatorHelper.maxLength(15).isValid(this.state.password),
      ValidatorHelper.maxLength(300).isValid(this.state.description)
    ];
    return validators.every(validator => validator === true);
    }

  render() {
    const { loading, user } = this.props;

    if (user.isLoggedIn) return <Redirect to='/' />;

    return (
      <div style={{ minHeight: 700, paddingTop: '50px'}}>
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
                name='name'
                control={Input}
                icon='user'
                placeholder='Full name'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(35)]}
                onChange={this.handleChange}
                required={true}
              />

              <CustomTextInput
                name='userName'
                control={Input}
                icon='user'
                placeholder='User name'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(35)]}
                onChange={this.handleChange}
                required={true}
              />

              <DateInput
                clearable
                name='birthDate'
                icon='birthday cake'
                iconPosition='left'
                value={this.state.birthDate}
                onChange={this.handleChangeDate}
                maxDate={new Date()}
                popupPosition='bottom right'
                closable
                placeholder="Birthdate"
              />

              <CustomTextInput
                name='country'
                control={Select}
                placeholder=''
                validators={[ValidatorHelper.notEmptyText()]}
                onChange={this.handleChange}
                required={true}
                options={countryOptions}
              />

              <CustomTextInput
                name='phoneNumber'
                control={Input}
                icon='call'
                placeholder='Phone number'
                validators={[ValidatorHelper.matchPhoneNumber()]}
                onChange={this.handleChange}
                required={false}
              />

              <CustomTextInput
                name='email'
                control={Input}
                icon='mail'
                placeholder='Email address'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.matchEmail()]}
                onChange={this.handleChange}
                required={true}
              />

              <CustomTextInput
                name='password'
                type='password'
                control={Input}
                icon='lock'
                placeholder='Password'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(15), ValidatorHelper.minLength(8)]}
                onChange={this.handleChange}
                required={true}
              />

              <CustomTextInput
                name='description'
                control={TextArea}
                placeholder='Write a litlte description about you'
                validators={[ValidatorHelper.maxLength(300)]}
                onChange={this.handleChange}
                required={false}
              />

              <Button primary disabled={!this.isSubmitEnabled} color='teal' fluid size='large'>
                Create account
              </Button>
            </Segment>
          </Form>
          <Message>
            <Link to='/login'>Back to login</Link>
          </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  loading: state.userStore.loading
})

const mapDispatchToProps = dispatch => ({
  createUser: (userData) => createUser(dispatch, userData)
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
