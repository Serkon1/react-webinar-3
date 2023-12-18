import {memo} from 'react';
import PropTypes from "prop-types";

import './style.css';

function AuthorizationError({error}) {


  return (
    <div className={'Error'}>
      {error}
    </div>
  )
}

AuthorizationError.propTypes = {
  error: PropTypes.string,
};

AuthorizationError.defaultProps = {
  error: 'Error'
}




export default memo(AuthorizationError);