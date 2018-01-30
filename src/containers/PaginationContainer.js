import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/heroes';
import Pagination from '../components/Pagination/Pagination';

export class PaginationContainer extends Component {
  render() {
    const showPagination = !this.props.favoritesShown
      && this.props.count > 0
      && !this.props.error;

    return showPagination
      ? <Pagination
          search={this.props.search}
          count={this.props.count}
          total={this.props.total}
          offset={this.props.offset}
          gotoPage={this.props.gotoPage} />
      : null;
  }
}

PaginationContainer.propTypes = {
  search: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  favoritesShown: PropTypes.bool.isRequired,
  gotoPage: PropTypes.func.isRequired
};

export const mapStateToProps = (state) => {
  const { search, count, total, offset, error, favoritesShown } = state;

  return {
    search,
    count,
    total,
    error,
    offset,
    favoritesShown
  }
}

export const mapActionsToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PaginationContainer);
