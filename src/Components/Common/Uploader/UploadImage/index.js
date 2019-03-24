import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'semantic-ui-react';

class UploadImage extends React.Component {

  static propTypes = {
    url: PropTypes.string.isRequired,
    percentage: PropTypes.number.isRequired,
  };
  static defaultProps = {
    url: '',
    percentage: 0
  };

  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <div>
        <Progress percent={this.props.percentage} progress success={this.props.percentage === 100}></Progress>
        <img width='90' src={this.props.url} />
        <br />
      </div>
    )
  }
}

export default UploadImage;
