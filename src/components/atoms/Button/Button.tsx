/**
 *
 * Button
 *
 */
import React, { useEffect, useState } from 'react';

const Button = ({props}) => {
  const [dummy, setDummy] = useState(true);

  useEffect(() => {
    // ... Use hooks
    setDummy(false);
  });

  return (<div dummy={dummy} {...props} />);
};

export default Button;

