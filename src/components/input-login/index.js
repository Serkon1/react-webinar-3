import {memo, useCallback, useLayoutEffect, useState} from 'react';
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';

import './style.css';

function InputLogin(props) {

  const cn = bem('Input');
  return (
    <div className={cn('login')}>
      <label htmlFor={props.htmlFor}>{props.labelText}</label>
      <input
        className={cn({theme: props.theme})}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  )
}

InputLogin.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  htmlFor: PropTypes.string,
}

InputLogin.defaultProps = {
  onChange: () => {
  },
  type: 'text',
  theme: ''
}

export default memo(InputLogin);