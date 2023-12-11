import React, {memo} from 'react';
import './style.css';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function ToMain({cleaningProduct, currentPage, toMain}) {

  const page = !currentPage ? 1 : currentPage + 1

  return (
      <Link
        to={`/${page}`}
        className="main"
        onClick={cleaningProduct}
      >
        {toMain}
      </Link>
  );
}


ToMain.propTypes = {
  cleaningProduct: PropTypes.func,
  currentPage: PropTypes.number
};

export default memo(ToMain);
