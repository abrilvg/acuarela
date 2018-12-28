import React from "react";
import { Message, Form} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ValidatorHelper from "../Validator";

export default class CustomField extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    validators: PropTypes.array.isRequired,
    type: PropTypes.string,
    control: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool.isRequired,
    options: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  handleChange = (e, data) => {
    let value = data? data.value: e.target.value;
    this.setState({
      errors: ValidatorHelper.validate(value, this.props.validators)
    });
    this.props.onChange(this.props.name, value);
  };

  render() {
    return (
      <div>
        <Form.Input
          control={this.props.control? this.props.control: 'Input'}
          label={this.props.label}
          placeholder={this.props.placeholder? this.props.placeholder: ''}
          type={this.props.type? this.props.type: 'text'}
          onChange={this.handleChange}
          error={this.state.errors.length > 0}
          required={this.props.required}
          options={this.props.options? this.props.options: []}
          defaultValue={this.props.options? this.props.options[0].value: ''}
        />
        {this.state.errors.length? (<Message error list={this.state.errors} />) : ''}
      </div>
    );
  }
}
