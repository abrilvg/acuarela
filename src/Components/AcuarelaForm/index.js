import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import CustomField from "../Common/CustomField";
import ValidatorHelper from "../Common/Validator";
import { Button, Form, Input, Select, Grid} from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

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

const techniqueOptions = [
  { key: 'wa', value: 'wa', text: 'Water' },
  { key: 'bo', value: 'bo', text: 'Paper' },
  { key: 'pl', value: 'pl', text: 'Plastic' },
  { key: 'cl', value: 'cl', text: 'Colors' },
];

class AcuarelaForm extends Component {

  componentWillReceiveProps = (nextProps) => { // Load Acuarela Asynchronously
    const { acuarela } = nextProps;
    if(acuarela._id !== this.props.acuarela._id) { // Initialize form only once
      this.props.initialize(acuarela)
    }
  }

  state = {
    name: '',
    startDate: null,
    endDate: null,
    image: '',
    technique: '',
    material: 'default',
    country: countryOptions[0].value,
    approved: '',
    rating: '5'
  };

  handleChangeStartDate = (date) => {
    this.setState({
      startDate: date
    });
  }

  handleChangeEndDate = (date) => {
    this.setState({
      endDate: date
    });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    this.props.onSubmit(this.state);
  }

  render() {
    const { pristine, submitting, loading, acuarela } = this.props;
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>{'Add New Acuarela'}</h1>
          {/* <h1 style={{marginTop:"1em"}}>{acuarela._id ? 'Edit Contact' : 'Add New Contact'}</h1> */}
          <Form onSubmit={this.handleSubmit} loading={loading} error>
            <CustomField
              name='name'
              label='Full name:'
              control={Input}
              placeholder='Enter acuarela name'
              validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(20)]}
              onChange={this.handleChange}
              required={true}
            />

            <SemanticDatepicker label="Start date"
              onDateChange={this.handleChangeStartDate}
              required
            />

            <SemanticDatepicker label="End date"
              onDateChange={this.handleChangeEndDate}
              required
            />

            <CustomField
              name='technique'
              label='Select technique applied:'
              control={Select}
              placeholder=''
              validators={[ValidatorHelper.notEmptyText()]}
              onChange={this.handleChange}
              required={true}
              options={techniqueOptions}
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

            <Button primary type='submit'>Save</Button>
          </Form>

        </Grid.Column>
      </Grid>
    )
  }
}

export default reduxForm({form: 'acuarela'})(AcuarelaForm);
