/**
 *
 * Hello
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

const Hello = ({ children }: any) => {

  return (<div>{children}</div>);
};

Hello.propTypes = {
  children: PropTypes.oneOfType([
              PropTypes.arrayOf(PropTypes.node),
              PropTypes.node
            ]).isRequired
}

export default Hello;
