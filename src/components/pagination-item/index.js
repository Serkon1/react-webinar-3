import React, {memo} from 'react';
import './style.css';
import {Link} from "react-router-dom";

function PaginationItem({value, currentPage}) {

  const lengthValue = value.toString().length

  function fillingClassName() {

    return 'Pagination-button '
      + (value === currentPage ? 'current ' : '')
      + (value !== '...' ? `w-${16 + lengthValue * 4}` : 'ellipsis')
  }

  const classValue = ``

  return (
        <Link
          to={`${value !== '...' ? '/' + value : '/' + currentPage}`}
          className={fillingClassName()}
        >
          {value}
        </Link>
  );
}

export default memo(PaginationItem);