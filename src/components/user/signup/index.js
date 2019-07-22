import {
  Button,
  Form,
  Input,
  Select,
  TextArea,
  Grid,
  Header,
  Message,
  Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { DateInput } from 'semantic-ui-calendar-react';
import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import CustomTextInput from '../../common/customTextInput';
import { createUser } from '../../../actions/userActions';
import ValidatorHelper from '../../../components/common/validator';

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

    // let errorMessage;

    // if (error.data || error.message) {
    //   errorMessage = (
    //     <Message icon negative>
    //       <Icon name='dont' />
    //       <Message.Content>
    //           <Message.Header>{error.data? error.data.message: error.message}</Message.Header>
    //           Please try again
    //      </Message.Content>
    //     </Message>
    //   );
    // }

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
                name='name'
                label='Full name:'
                control={Input}
                placeholder='Enter your full name'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(35)]}
                onChange={this.handleChange}
                required={true}
              />

              <CustomTextInput
                name='userName'
                label='User name:'
                control={Input}
                placeholder='Enter user name'
                validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(35)]}
                onChange={this.handleChange}
                required={true}
              />

              <DateInput
                clearable
                name='birthDate'
                value={this.state.birthDate}
                onChange={this.handleChangeDate}
                maxDate={new Date()}
                popupPosition='bottom right'
                closable
                label='Birth date:'
                placeholder="DD-MM-YYYY"
              />

              <CustomTextInput
                name='country'
                label='Select your contry:'
                control={Select}
                placeholder=''
                validators={[ValidatorHelper.notEmptyText()]}
                onChange={this.handleChange}
                required={true}
                options={countryOptions}
              />

              <CustomTextInput
                name='phoneNumber'
                label='Phone number:'
                control={Input}
                placeholder='Enter phone number'
                validators={[ValidatorHelper.matchPhoneNumber()]}
                onChange={this.handleChange}
                required={false}
              />

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

              <CustomTextInput
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
                    {/* <Form.Input control={Button} disabled={!isSubmitEnabled}>Submit</Form.Input> */}
                    <Button primary disabled={!this.isSubmitEnabled}>Submit</Button>
                  </Grid.Column>
                  <Grid.Column>
                    <Link to='/login'>Cancel</Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

            </Form>
            {/* {errorMessage} */}

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
  loading: state.userStore.loading
})

const mapDispatchToProps = dispatch => ({
  createUser: (userData) => createUser(dispatch, userData)
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
