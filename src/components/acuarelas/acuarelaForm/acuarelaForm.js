import { DateInput } from 'semantic-ui-calendar-react';
import { Button, Form, Input, Select, Grid} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CustomTextInput from '../../common/customTextInput/customTextInput';
import ValidatorHelper from '../../common/validator/validator';
import Uploader from '../../common/uploader/uploader';

//TODO bring to other place
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
    acuarela: PropTypes.object,
    loading: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps = (nextProps) => { // Load Acuarela
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
    this.setState(prevState => ({
      images: [...prevState.images, newImage ]
    }))
  }

  handleSubmit = (e) => {
    this.setState( prevState => ({
      //how to improve this? it shows a warning in console :/
      createdDate: new Date(prevState.createdDate)
    }), () => {
      this.props.onSubmit(this.state);
    });
  }

  get isSubmitEnabled () {
    const validators = [
      ValidatorHelper.notEmptyText().isValid(this.state.name),
      ValidatorHelper.notEmptyValue().isValid(this.state.createdDate),
      ValidatorHelper.notEmptyText().isValid(this.state.technique),
      ValidatorHelper.notEmptyText().isValid(this.state.country),
      this.state.images.length > 0
    ];
    return validators.every(validator => validator === true);
  }

  render() {

    const { loading } = this.props;

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <h2>{'New Acuarela'}</h2>
          {/* <h1 style={{marginTop:"1em"}}>{acuarela._id ? 'Edit Contact' : 'Add New Contact'}</h1> */}
          <Form onSubmit={this.handleSubmit} loading={loading} error>
            <CustomTextInput
              name='name'
              control={Input}
              icon='paint brush'
              placeholder='Acuarela name'
              validators={[ValidatorHelper.notEmptyText(), ValidatorHelper.maxLength(20)]}
              onChange={this.handleChange}
              required={true}
            />

            <DateInput
                clearable
                name='createdDate'
                iconPosition='left'
                value={this.state.createdDate}
                onChange={this.handleChangeDate}
                maxDate={new Date()}
                popupPosition='bottom right'
                closable
                placeholder="Year of"
            />

            <CustomTextInput
              name='technique'
              control={Select}
              placeholder=''
              validators={[ValidatorHelper.notEmptyText()]}
              onChange={this.handleChange}
              required={true}
              options={techniqueOptions}
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

            <Uploader
              onChange={this.handleUploadImages}
            />
            
            <br></br>

            <Button primary type='submit' disabled={!this.isSubmitEnabled}>Save</Button>
          </Form>

        </Grid.Column>
      </Grid>
    )
  }
}

export default AcuarelaForm;
