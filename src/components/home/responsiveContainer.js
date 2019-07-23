import PropTypes from 'prop-types';
import React from 'react';
import Container from './container';

const ResponsiveContainer = ({ children }) => (
  <div>
    <Container>{children}</Container>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer;
