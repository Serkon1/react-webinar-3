import React from "react";
import PropTypes from "prop-types";
import './style.css';
import { cn as bem } from '@bem-react/classname';

const cn = bem('Head')

function Head({ title }) {
  return (
    <div className={cn()}>
      <h1 className={cn(`title`)}>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
