import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import CustomField from "../Common/CustomField";
import ValidatorHelper from "../Common/Validator";
import { Button, Form, Input, Select, Grid} from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import Uploader from "../Common/Uploader";
import PropTypes from 'prop-types';

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

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.object
  };

  componentWillReceiveProps = (nextProps) => { // Load Acuarela Asynchronously
    /*const { acuarela } = nextProps;
    if(acuarela._id !== this.props.acuarela._id) { // Initialize form only once
      this.props.initialize(acuarela)
    }*/
  }

  state = {
    name: '',
    createdDate: '',
    image: '',
    technique: techniqueOptions[0].value,
    material: 'default',
    country: countryOptions[0].value,
    approved: '',
    rating: '5',
    images: []
  };

  handleChangeDate = (event, {name, value}) => {
    this.setState({
      [name]: value
    });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  }

  handleUploadImages = (newImage) => {
    this.setState({
      images: [...this.state.images, newImage ]
    })
  }

  handleSubmit = (e) => {
    this.setState({
      //how to improve this?
      createdDate: new Date(this.state.createdDate)
    }, () => {
      this.props.onSubmit(this.state);
    });
  }

  isSubmitEnabled = () => {
    return ValidatorHelper.notEmptyText().isValid(this.state.name) &&
      ValidatorHelper.notEmptyValue().isValid(this.state.createdDate) &&
      ValidatorHelper.notEmptyText().isValid(this.state.technique) &&
      ValidatorHelper.notEmptyText().isValid(this.state.country) &&
      this.state.images.length > 0;
  }

  render() {
    //TODO is correct put here this validations?
    let isSubmitEnabled = this.isSubmitEnabled();

    const { pristine, submitting, loading, acuarela, error } = this.props;

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

            <DateInput
                clearable
                name='createdDate'
                value={this.state.createdDate}
                onChange={this.handleChangeDate}
                maxDate={new Date()}
                popupPosition='bottom right'
                closable
                label='Year of:'
                placeholder="DD-MM-YYYY"
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

            <Uploader
              label='Select your pictures:'
              onChange={this.handleUploadImages}
            />

            <Button primary type='submit' disabled={!isSubmitEnabled}>Save</Button>
          </Form>

          {error}

        </Grid.Column>
      </Grid>
    )
  }
}

export default reduxForm({form: 'acuarela'})(AcuarelaForm);
