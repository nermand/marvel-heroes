import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = props => {
  const resultsPerPage = 20;
  const page = Math.ceil((props.count + props.offset )/resultsPerPage);
  const pages = Math.ceil(props.total/resultsPerPage);

  const paginate = (page, e) => {
    e.preventDefault();
    const nextOffset = (page - 1) * resultsPerPage;
    props.gotoPage(props.search, nextOffset);
  }

  return (
    <ul className="pager">
      <li>
        <a className={page === 1 ? 'disabled' : ''} href=""
          onClick={(e) => paginate(1, e)}>&lt;&lt;</a>
      </li>
      <li>
        <a className={page === 1 ? 'disabled' : ''} href=""
          onClick={(e) => paginate(page - 1, e)}>&lt; Previous page</a>
      </li>
      <li>
        <span>Page {page} of {pages}</span>
      </li>
      <li>
        <a className={page === pages ? 'disabled' : ''} href=""
          onClick={(e) => paginate(page + 1, e)}>Next page &gt;</a>
      </li>
      <li>
        <a className={page === pages ? 'disabled' : ''} href=""
          onClick={(e) => paginate(pages, e)}>&gt;&gt;</a>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  search: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  gotoPage: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired
};

export default Pagination;
