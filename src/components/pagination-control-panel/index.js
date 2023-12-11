import React, {memo, useCallback, useEffect, useState} from 'react';
import './style.css';
import {fillingListPagination} from "../../utils";
import PaginationItem from "../pagination-item";
import PropTypes from "prop-types";

function PaginationControlPanel({currentPage, maxPage}) {

  const [buttonArray, setButtonArray] = useState([])

  useEffect(() => {
    callbacks.fillingListPagination()
  }, [maxPage, currentPage]);

  const callbacks = {
    fillingListPagination: useCallback(() => {
      const ListPagination = fillingListPagination(currentPage, maxPage)
      setButtonArray(ListPagination)
    }, [maxPage, currentPage])
  }

    return (
      <div className={'Pagination'}>
        {buttonArray.map(el =>
          <PaginationItem
            key={el.code}
            value={el.value}
            currentPage={currentPage}
          />
        )}

      </div>
    );
}

PaginationControlPanel.propTypes = {
  currentPage: PropTypes.number,
  maxPage: PropTypes.number,
};

PaginationControlPanel.defaultProps = {
  currentPage: 1,
  maxPage: 1
}


export default memo(PaginationControlPanel);